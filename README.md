# TraceLab

### build PROD


1️⃣ Build the frontend (Vite + React)

From the renderer folder:
```bash
cd renderer
npm run build
```
This generates renderer/dist with a production-ready bundle of your React app.

2️⃣ Package the Flask backend

Since you want a self-contained app, we need to create a binary executable of your Flask backend. The easiest approach is PyInstaller:

```bash
cd backend
poetry run pyinstaller --onefile -n tracelab_backend -w tracelab/app.py
```

`-w` = no console window (macOS)

Output: `backend/dist/tracelab_backend`

Make sure it’s executable:
```bash
chmod +x dist/tracelab_backend
```

Now the backend can run independently of Python.

5️⃣ Build the production app

From electron/:
```bash
npm run build
```

This produces a .dmg installer with your fully packaged Electron app

Users can double-click to run — no Python needed

Flask backend runs as a bundled executable


Run in terminal to see log
```bash
/Applications/trace-lab.app/Contents/MacOS/trace-lab --enable-logging
```