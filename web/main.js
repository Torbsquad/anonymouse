const express = require("express");
const { server } = require("vnft-tools");

const app = express();
app.get("/test", function(req, res) {
  res.send("Hello I am running in anonymouse!");
});

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

const privateKey = process.env.privateKey;
const certificate = process.env.certificate;

app.listen(process.env.PORT);
//server(app, privateKey, certificate);
