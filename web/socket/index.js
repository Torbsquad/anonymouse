const express = require('express')
const app = express()
const { SiteHandler } = require('vnft-tools')
const siteHandler = new SiteHandler(app)
const path = require('path')

app.get('/', (req, res) => {
  res.json({ status: 'OK!' })
})

module.exports = app
