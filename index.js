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
      contextIsolation: false
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
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});


ipcMain.on('new', function (event) {
  filePath = undefined;
});

ipcMain.on('openFile', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]})
    .then((e) => {
      if (e.canceled) {
        event.sender.send('Error');
        console.log(chalk.blue('File opening cancelled'));
        return;
      }
      filePath = e.filePaths[0];
      openProject(event, 'openFile');
      console.log(chalk.blue('File opened'));
    });
});

ipcMain.on('loadTemplates', event => {
  const templatesPath = './src/assets/templates';
  const templates = [];
  fs.readdirSync(templatesPath).forEach(fileName => {
    const file = (fs.readFileSync(`${templatesPath}/${fileName}`, 'utf8'));
    templates.push(new TemplateData(fileName.replace('.mustache', ''), file));
  });
  event.sender.send('loadTemplates', templates)
});

ipcMain.on('reopenLastFile', (event, message) => {
  filePath = message;
  openProject(event, 'reopenLastFile');
  console.log(chalk.blue('File reopened'));
});

ipcMain.on('saveFile', (event, message) => {
  if (filePath) {
    saveFileToDir(message, event);
    console.log(chalk.green('File saved'));
  } else {
    showSaveDialog(message, event);
  }
  event.sender.send('saveFile');
});

ipcMain.on('saveFileAs', (event, message) => {
  showSaveDialog(message, event);
});

function showSaveDialog(message, event) {
  dialog.showSaveDialog({properties: ['saveFile'], filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]})
    .then((e) => {
      if (e.canceled) {
        console.log(chalk.red('File save cancelled'));
        event.sender.send('Error');
        return;
      }
      filePath = e.filePath;
      saveFileToDir(message, event);
      console.log(chalk.green('File saved'));
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

function saveFileToDir(content, event) {
  fs.writeFile(filePath, content, err => {
    if (err) {
      event.sender.send('Error');
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

class TemplateData {
  name;
  template;

  constructor(name, template) {
    this.name = name;
    this.template = template;
  }
}
