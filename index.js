const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const fs = require('fs')
const url = require("url");
const path = require("path");

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow
let filePath

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/dist/index.html`),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );
  mainWindow.loadURL('http://localhost:4200')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})



ipcMain.on('new', function (event) {
  filePath = undefined;
})

ipcMain.on('openFile', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]})
    .then((e) => {
      if (e.canceled) {
        event.sender.send('Error');
        console.log('File opening cancelled');
        return;
      }
      filePath = e.filePaths[0];
      openProject(event);
      console.log('File opened');
    })
})

ipcMain.on('saveFile', (event, message) => {
  if (filePath) {
    saveFileToDir(message, event);
    console.log('File saved');
  } else {
    showSaveDialog(message, event)
  }
  event.sender.send('saveFile')
})

ipcMain.on('saveFileAs', (event, message) => {
  showSaveDialog(message, event)
})

function showSaveDialog(message, event) {
  dialog.showSaveDialog({properties: ['saveFile'], filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]})
    .then((e) => {
      if (e.canceled) {
        console.log('File save cancelled');
        event.sender.send('Error');
        return;
      }
      filePath = e.filePath;
      saveFileToDir(message, event);
      console.log('File saved');
    })
}

function openProject(event) {
  fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
    if (err) {
      event.sender.send('Error');
      return;
    }
    if (data) {
      event.sender.send('openFile', data);
    }
  })
}

function saveFileToDir(content, event) {
  console.log(content)
  fs.writeFile(filePath, content, err => {
    if (err) {
      event.sender.send('Error');
    }
  });
}
