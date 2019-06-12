const cert = process.env.certificate;
const key = process.env.privatekey;

const express = require('express')
const vhost = require('vhost')

const { server } = require("vnft-tools")
 
const app1 = express()
const app2 = express()

app1.get('/', (req, res) => {
  res.send('Hello World!')
})

app2.get('/', (req, res) => {
  res.send('Hello World2!')
})

const app = express()
app.use(vhost('vnft.cc', app1))
app.use(vhost('api.vnft.cc', app2))

server(app, key, cert);
