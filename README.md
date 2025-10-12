# TraceLab

```
trace-lab/
│
├── backend/
│   ├── app.py
│   ├── pyproject.toml          # poetry configuration
│   ├── poetry.lock
│   └── README.md
│
├── electron/
│   ├── main.js                 # Electron main process
│   ├── preload.js              # IPC-safe bridge
│   ├── package.json
│   ├── scripts/
│   │   └── dev.sh              # Starts Flask + Vite + Electron in dev
│   └── build.sh                # Builds backend + frontend + Electron app
│
├── renderer/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   └── SinePlot.jsx
│       └── main.jsx
│
└── README.md
```
