#!/usr/bin/env bash
set -e
echo "🚀 Starting TraceLab Dev Environment..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../../backend"
RENDERER_DIR="$SCRIPT_DIR/../../renderer"
ELECTRON_DIR="$SCRIPT_DIR/.."

echo "📦 Backend dir: $BACKEND_DIR"
echo "📦 Renderer dir: $RENDERER_DIR"
echo "📦 Electron dir: $ELECTRON_DIR"

# Check folders exist
[ ! -d "$BACKEND_DIR" ] && echo "❌ Backend not found" && exit 1
[ ! -d "$RENDERER_DIR" ] && echo "❌ Renderer not found" && exit 1
[ ! -d "$ELECTRON_DIR" ] && echo "❌ Electron folder not found" && exit 1

# Cleanup function
cleanup() {
  echo "🛑 Stopping backend..."
  kill $BACKEND_PID 2>/dev/null || true
  exit
}
trap cleanup SIGINT SIGTERM EXIT

# Start backend
cd "$BACKEND_DIR"
poetry run python -m tracelab.app &
BACKEND_PID=$!

# Start frontend
npm run dev --prefix "$RENDERER_DIR" &
npx wait-on http://localhost:5173/index.html

# Start Electron from correct folder
cd "$ELECTRON_DIR"
cross-env NODE_ENV=development electron .
