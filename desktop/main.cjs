// Proceso principal de la app de escritorio.
// Arranca el servidor Express (con SQLite) dentro de Electron y abre una ventana con la interfaz.
const { app, BrowserWindow, Menu, dialog, nativeTheme, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

// Puerto fijo: así el navegador interno conserva el perfil activo (localStorage) entre aperturas.
const PREFERRED_PORT = 47831;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  let win = null;
  let origin = null;

  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  async function startBackend() {
    // La base de datos vive en %APPDATA%\CodeRuta\data: sobrevive a actualizaciones y desinstalaciones.
    process.env.CODERUTA_DATA_DIR = path.join(app.getPath('userData'), 'data');
    const serverEntry = pathToFileURL(path.join(__dirname, '..', 'server', 'src', 'index.js')).href;
    const { startServer } = await import(serverEntry);

    for (let port = PREFERRED_PORT; port < PREFERRED_PORT + 10; port++) {
      try {
        return (await startServer(port)).port;
      } catch (err) {
        if (err.code !== 'EADDRINUSE') throw err;
      }
    }
    return (await startServer(0)).port; // último recurso: cualquier puerto libre
  }

  function createWindow() {
    win = new BrowserWindow({
      width: 1200,
      height: 820,
      minWidth: 380,
      minHeight: 560,
      title: 'CodeRuta',
      icon: path.join(__dirname, '..', 'build', 'icon.png'),
      backgroundColor: nativeTheme.shouldUseDarkColors ? '#14121f' : '#f5f4fb',
      autoHideMenuBar: true,
      show: false,
      webPreferences: { contextIsolation: true, sandbox: true },
    });

    win.once('ready-to-show', () => win.show());

    // Los enlaces externos se abren en el navegador del sistema, no dentro de la app.
    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });
    win.webContents.on('will-navigate', (event, url) => {
      if (!url.startsWith(origin)) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });

    win.on('closed', () => {
      win = null;
    });
    win.loadURL(origin);
  }

  app.whenReady().then(async () => {
    Menu.setApplicationMenu(null);
    try {
      const port = await startBackend();
      origin = `http://127.0.0.1:${port}`;
    } catch (err) {
      dialog.showErrorBox('CodeRuta no pudo arrancar', String(err?.stack || err));
      app.quit();
      return;
    }
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
