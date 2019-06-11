const cert = process.env.certificate;
const key = process.env.privatekey;

const express = require("express");
const { server } = require("vnft-tools");

const app = express();
app.get("/", function(req, res, next) {
  if (req.headers.host != "api.vnft.cc") next();
  res.json({ status: "OK" });
});

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use(
  express.static(__dirname + "/public", {
    extensions: ["html"]
  })
);

server(app, key, cert);
