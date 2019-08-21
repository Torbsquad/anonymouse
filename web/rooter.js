const cert = process.env.certificate
const key = process.env.privatekey

const express = require('express')
const vhost = require('vhost')
var path = require('path')
const app = express()

const { server } = require('vnft-tools')

const Server = server(app, key, cert)

global.io = require('socket.io').listen(Server.https)
global.root_directory = path.resolve('../')

if (process.env.NODE_ENV == 'dev') {
  app.use(vhost('localhost', require('./root')))
} else {
  app.use(vhost('vnft.cc', require('./root')))
 // app.use(vhost('socket.vnft.cc', require('./socket')))
  app.use(vhost('api.vnft.cc', require('./api')))
 // app.use(vhost('anon-spirit.herokuapp.com', require('./core')))
}
