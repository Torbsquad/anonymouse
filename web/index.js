require('dotenv').config()
var express = require('express')
var path = require('path')
var app = express()
var server = require('http').createServer(app);
const client = require("../connect.js")

app.get('/1', function (req, res) {
  res.send('hello world')
})

app.get('/api/:namespace/:action/:data/:meta', async function (req, res) {
  try{
    if(process.env.debug){
      delete require.cache[require.resolve(`../api/${req.params.namespace}/${req.params.action}`)]
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.json(await require(`../api/${req.params.namespace}/${req.params.action}`)(req.params.data, req.params.meta))
  }
  catch(err){
    console.log(err)
    if(process.env.debug){
      res.send(err.message)
    }
    else{
      res.sendStatus(404)
    }
  }
})

app.get('/api/:namespace/:action/:data', async function (req, res) {
  try{
    if(process.env.debug){
      delete require.cache[require.resolve(`../api/${req.params.namespace}/${req.params.action}`)]
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.json(await require(`../api/${req.params.namespace}/${req.params.action}`)(req.params.data))
  }
  catch(err){
    console.log(err)
    if(process.env.debug){
      res.send(err.message)
    }
    else{
      res.sendStatus(404)
    }
  }
})

app.get('/api/:namespace/:action', async function (req, res) {
  try{
    if(process.env.debug){
      delete require.cache[require.resolve(`../api/${req.params.namespace}/${req.params.action}`)]
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.json(await require(`../api/${req.params.namespace}/${req.params.action}`)())
  }
  catch(err){
    console.log(err)
    if(process.env.debug){
      res.send(err.message)
    }
    else{
      res.sendStatus(404)
    }
  }
})

app.use(
  express.static(path.join(__dirname, 'public'),
  {extensions:['html']}
))

server.listen(process.env.PORT || 3000)
try{
  require("../socket")(server)
}
catch(err){
  console.log(err.message)
}
