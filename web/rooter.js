const cert = process.env.certificate;
const key = process.env.privatekey;

const express = require("express");
const vhost = require("vhost");

const { server } = require("vnft-tools");

const app = express();
app.use(vhost("vnft.cc", require("./root")));
app.use(vhost("api.vnft.cc", require("./api")));

server(app, key, cert);
