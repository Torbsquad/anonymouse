const express = require('express')
const app = express()
const path = require("path")

app.get('/', (req, res) => {
  res.send("A")
})

app.get('/chart.js', (req, res) => {
  res.sendFile(path.join('node_modules', 'chart.js', 'dist', 'Chart.js'))
})

module.exports = app;
