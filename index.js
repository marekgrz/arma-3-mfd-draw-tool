const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const fs = require('fs');
const url = require("url");
const path = require("path");
const chalk = require('chalk');

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow;
let filePath;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  mainWindow.maximize();

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/dist/index.html`),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );
  mainWindow.loadURL('http://localhost:4200');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});


ipcMain.on('new', event => {
  filePath = undefined;
});

ipcMain.on('openFile', event => {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]})
    .then((e) => {
      if (e.canceled) {
        event.sender.send('cancel');
        console.log(chalk.blue('File opening cancelled'));
        return;
      }
      filePath = e.filePaths[0];
      openProject(event, 'openFile');
      console.log(chalk.blue('File opened'));
    });
});

ipcMain.on('reopenLastFile', (event, message) => {
  filePath = message;
  openProject(event, 'reopenLastFile');
  console.log(chalk.blue('File reopened'));
});

ipcMain.on('saveFile', (event, message) => {
  if (filePath) {
    saveFileToDir(message, event, 'fileSaved');
    console.log(chalk.green('File saved'));
  } else {
    showSaveDialog(message, event);
  }
  event.sender.send('saveFile');
});

ipcMain.on('saveFileAs', (event, message) => {
  showSaveDialog(message, event);
});

ipcMain.on('exportToA3', (event, message) => {
  showExportDialog(message, event);
});

function showSaveDialog(message, event) {
  dialog.showSaveDialog({properties: ['saveFile'], filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]})
    .then((e) => {
      if (e.canceled) {
        console.log(chalk.red('File save cancelled'));
        event.sender.send('cancel');
        return;
      }
      filePath = e.filePath;
      saveFileToDir(message, event, 'saveFileAs');
      console.log(chalk.green('File saved'));
    });
}

function showExportDialog(message, event) {
  dialog.showSaveDialog({properties: ['saveFile'], filters: [{name: 'A3 class file', extensions: ['hpp']}]})
    .then((e) => {
      if (e.canceled) {
        console.log(chalk.red('File export cancelled'));
        event.sender.send('cancel');
        return;
      }
      filePath = e.filePath;
      saveFileToDir(message, event, 'fileExported');
      console.log(chalk.green('File export successful'));
    });
}

function openProject(event, channel) {
  fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
    if (err) {
      event.sender.send(channel);
      return;
    }
    if (data) {
      event.sender.send(channel, new ProjectFileData(data, filePath));
    }
  });
}

function saveFileToDir(content, event, channel) {
  fs.writeFile(filePath, content, err => {
    if (err) {
      event.sender.send('Error');
    } else {
      event.sender.send(channel);
    }
  });
}

class ProjectFileData {
  data;
  filePath;

  constructor(data, filePath) {
    this.data = data;
    this.filePath = filePath;
  }
}

class TextureFileData {
  data;
  filePath;
  fileName;

  constructor(data, filePath, filename) {
    this.data = data;
    this.filePath = filePath;
    this.fileName = filename;
  }
}
