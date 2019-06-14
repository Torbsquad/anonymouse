const express = require("express");
const app = express();
const { fetchJS } = require("vnft-tools")
const path = require("path")

app.get("/", (req, res) => {
  res.json({ status: "OK!" });
});

let files = fetchJS(path.join(__dirname,"emoji"));
for(let file of files){
  let site = require(file)
  if( site.name && site.get ){
    app.get(site.name, site.get);
  }
}

module.exports = app;
