const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.get("/", function(req, res) {
  res.send("Hello I am running in anonymouse!");
});

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

app.listen(port, c => console.log(port));
