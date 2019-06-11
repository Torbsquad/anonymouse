const cert = process.env.certificate;
const key = process.env.privatekey;

const express = require("express");
const { server } = require("vnft-tools");

const app = express();
app.get("/", function(req, res) {
  res.send("Hello I am running in anonymouse!");
  console.log(res)
});

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

server(app,key,cert);
