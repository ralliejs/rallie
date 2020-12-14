const express = require('express');
const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const app = new express();

if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}

const childProcess = child_process.exec('npm run watch');
childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

app.use(express.static(path.join(__dirname, './dist/')));

app.listen('9999', () => {
    setTimeout(() => {
        try {
            child_process.execSync('open http://localhost:9999/index.html'); // mac
        } catch (err) {
            child_process.execSync('start http://localhost:9999/index.html'); // windows
        }
    }, 3000);
});