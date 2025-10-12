const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

let backendProcess;
let backendPort = 5000;

// Detect dev mode
const isDev = process.env.NODE_ENV === "development";

function startBackend() {
  console.log("Starting backend...");

  if (isDev) {
    // Development: run Python via Poetry
    const backendPath = path.join(__dirname, "../backend");
    backendProcess = spawn("poetry", ["run", "python", "app.py"], {
      cwd: backendPath,
      shell: true,
    });
  } else {
    // Production: run the PyInstaller-built binary
    const binaryPath = path.join(process.resourcesPath, "backend", "tracelab_backend");

    if (!fs.existsSync(binaryPath)) {
      console.error(`❌ Backend binary not found at ${binaryPath}`);
      app.quit();
      return;
    }

    backendProcess = spawn(binaryPath, [], {
      cwd: path.dirname(binaryPath),
      shell: false,
    });
  }

  backendProcess.stdout.on("data", (data) => console.log(`[Backend] ${data}`));
  backendProcess.stderr.on("data", (data) => console.error(`[Backend Error] ${data}`));
  backendProcess.on("exit", (code) => console.log(`Backend exited with code ${code}`));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(process.resourcesPath, "renderer", "index.html"));
  }

  win.on("closed", () => {
    if (backendProcess) backendProcess.kill("SIGINT");
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

// Quit app completely when all windows are closed
app.on("window-all-closed", () => {
  if (backendProcess) backendProcess.kill("SIGINT");
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
