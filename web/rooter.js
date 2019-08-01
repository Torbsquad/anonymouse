const cert = process.env.certificate
const key = process.env.privatekey

const express = require('express')
const vhost = require('vhost')

const { server } = require('vnft-tools')

const app = express()
app.use(vhost('vnft.cc', require('./root')))
app.use(vhost('socket.vnft.cc', require('./socket')))
app.use(vhost('api.vnft.cc', require('./api')))
app.use(vhost('localhost', require('./root')))
app.use(vhost('anon-spirit.herokuapp.com', require('./core')))

server(app, key, cert)
