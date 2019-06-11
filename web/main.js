const cert = process.env.certificate;
const key = process.env.privatekey;

const connect = require('connect')
const serveStatic = require('serve-static')
const vhost = require('vhost')
const { server } = require("vnft-tools")
 
const mainapp = connect()

mainapp.use(function(req, res, next){
  res.send("1")
});

const userapp = connect()
 
userapp.use(function(req, res, next){
  var username = req.vhost[0]
  req.originalUrl = req.url
  req.url = '/' + username + req.url
  next()
})
userapp.use(serveStatic('public'))

const app = connect()
app.use(vhost('vnft.cc', mainapp))
app.use(vhost('api.vnft.cc', userapp))

server(app, key, cert);
