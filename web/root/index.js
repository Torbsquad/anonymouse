const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.send("A");
});

app.get("/chart.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "node_modules", "chart.js", "dist", "Chart.js"));
});

app.use(
  express.static(__dirname + "/public", {
    extensions: ["html"]
  })
);

module.exports = app;
