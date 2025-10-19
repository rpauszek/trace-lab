# TraceLab

## Installation instructions

```bash
# Frontend (renderer)
cd renderer
npm install

# Backend (Python)
cd ../backend
poetry install

# Electron
cd ../electron
npm install
```

## Run in `dev` mode

From the `trace-lab/electron` directory:
```bash
npm run dev
```

To experiment with GUI components, run the workbench from the `trace-lab/electron` directory
```bash
npm run workbench
```


## Build

Build the frontend (Vite + React); from the `renderer` folder:
```bash
npm run build
```
This generates `renderer/dist` with a production-ready bundle of your React app.

Package the Flask backend; from `backend`:
```bash
poetry run pyinstaller --onefile -n tracelab_backend -w tracelab/app.py
```

`-w` = no console window (macOS)

Output: `backend/dist/tracelab_backend`

Make sure it’s executable:
```bash
chmod +x dist/tracelab_backend
```

Now the backend can run independently of Python.

Build the production app; from `electron`:
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