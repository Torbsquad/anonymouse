const cert = process.env.certificate;
const key = process.env.privatekey;

const express = require("express");
const { server } = require("vnft-tools");

const app = express();
app.get("/", function(req, res) {
  res.send("Hello I am running in anonymouse!");
});

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));


// api fun start
const subdomain = require("express-subdomain")
var router = express.Router();
 
router.get('/', function(req, res) {
    res.send('Welcome to our API!');
});
 
router.get('/users', function(req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

app.use(subdomain('api', router));
// api fun end

server(app,key,cert);
