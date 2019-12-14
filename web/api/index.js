const express = require('express')
const app = express()
const { SiteHandler } = require('vnft-tools')
const siteHandler = new SiteHandler(app)
const path = require('path')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  res.json({ status: 'OK!' })
})

if (process.env.NODE_ENV == 'dev') {
  siteHandler.loadFolder(path.join(__dirname, 'pk'))
} else {
  siteHandler.loadFolder(path.join(__dirname, 'twit'))
  siteHandler.loadFolder(path.join(__dirname, 'emoji'))
  siteHandler.loadFolder(path.join(__dirname, 'socket'))
  siteHandler.loadFolder(path.join(__dirname, 'nazrin'))
  siteHandler.loadFolder(path.join(__dirname, 'pk'))
}

module.exports = app
