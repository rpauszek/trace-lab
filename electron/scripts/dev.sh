#!/usr/bin/env bash
set -e
echo "🚀 Starting TraceLab Dev Environment..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../../backend"
RENDERER_DIR="$SCRIPT_DIR/../../renderer"
ELECTRON_DIR="$SCRIPT_DIR/.."

WORKBENCH_MODE=false
if [[ "$1" == "--workbench" ]]; then
  WORKBENCH_MODE=true
  echo "🧪 Launching Workbench Mode (no backend)..."
fi

echo "📦 Backend dir: $BACKEND_DIR"
echo "📦 Renderer dir: $RENDERER_DIR"
echo "📦 Electron dir: $ELECTRON_DIR"

# Check folders exist
[ ! -d "$BACKEND_DIR" ] && echo "❌ Backend not found" && exit 1
[ ! -d "$RENDERER_DIR" ] && echo "❌ Renderer not found" && exit 1
[ ! -d "$ELECTRON_DIR" ] && echo "❌ Electron folder not found" && exit 1

# Kill any leftover Vite dev servers on default port
VITE_PORT=5173
lsof -ti tcp:$VITE_PORT | xargs -r kill -9

# Cleanup function
cleanup() {
  echo "🛑 Stopping backend and frontend..."
  [ -n "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null || true
  [ -n "$FRONTEND_PID" ] && kill $FRONTEND_PID 2>/dev/null || true
}
trap cleanup SIGINT SIGTERM EXIT

# --- Start backend ---
cd "$BACKEND_DIR"  # must be where pyproject.toml lives
export PYTHONPATH="$BACKEND_DIR"  # ensure Python finds tracelab package
poetry run python -m tracelab.app &
BACKEND_PID=$!

echo "📦 Running backend from: $(pwd)"
echo "📦 PYTHONPATH=$PYTHONPATH"

# --- Start frontend (Vite) ---
npm run dev --prefix "$RENDERER_DIR" &
FRONTEND_PID=$!

# Wait for Vite to be ready
npx wait-on http://localhost:$VITE_PORT/index.html

# --- Start Electron ---
cd "$ELECTRON_DIR"
if [ "$WORKBENCH_MODE" = true ]; then
  cross-env NODE_ENV=development electron . --workbench
else
  cross-env NODE_ENV=development electron .
fi
