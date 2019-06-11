const cert = process.env.certificate;
const key = process.env.privatekey;

const express = require("express");
const { server } = require("vnft-tools");

const app = express();
app.get("/", function(req, res, next) {
  if(req.headers.host != "api.vnft.cc"){
    next(); // i dont like this solution
    console.log(req.headers.host)
    res.send("hi!");
  }
});

app.get("/", function(req, res, next) {
  console.log(req.headers.host)
  res.send("ho!");
});

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

server(app,key,cert);
