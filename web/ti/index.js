const express = require('express')
const app = express()
const path = require('path')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/axios.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'node_modules', 'axios', 'dist', 'axios.js'))
})

app.get('/socket.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'node_modules', 'socket.io-client', 'dist', 'socket.io.js'))
})

app.use(
  express.static(__dirname + '/public', {
    extensions: ['html'],
  }),
)

module.exports = app
