const express = require('express');
const child_process = require('child_process');
const path = require('path');

const app = new express();

app.use(express.static(path.join(__dirname, './public/')));

app.listen('3000', () => {
    child_process.execSync('start http://localhost:3000/index.html#reactPage');
});