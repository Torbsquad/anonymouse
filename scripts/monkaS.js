const { Script } = require("vnft-commandhandler");
const axios = require("axios");

const monkaScript = new Script();

monkaScript.funct = (bot) => {
  const monkasId = "573255283044778009";
  const monkaS = bot.emojis.find(e => e.id == monkasId);
  const monkaHash = [
    "4d0762077b3378c33c1b0bdd03decc210fe81ffa383a018e1fe187e3801f00bf",
    "1468151451",
    "2434766319",
    "2284100025",
    "3080738599"
  ]
  
  bot.on("message", async message => {
    let content = message.content
    content += content.split("").reverse().join("")
    
    const images = message.attachments.map(a=>a.url)
    
    let monkaCount = ( content.match(/m[^a-z]*?[0o][^a-z]*?n[^a-z]*?k[^a-z]*?[a4][^a-z]*?[s5]/gi) || [] ).length
    
    for(let image of images){
      let urlsnippet = image.match(/\/[0-9]*?\/[0-9]*?\/.*?$/)
      if( urlsnippet ){
        let hash = (await axios.get("https://untitled-p9bey7ap3m46.runkit.sh/"+urlsnippet[0])).data.toString()
        console.log(hash)
        if ( monkaHash.includes(hash) ) {
          monkaCount++
        }
      }
    }
    
    if (monkaCount && !message.author.bot) {
      let response = new Array(monkaCount).fill(monkaS.toString());
      message.channel.send(response.join(" "));
    }
  });
};

module.exports = monkaScript;


/*
 endpoint: 
var { imageHash } = require("image-hash")
const axios = require('axios');
const stringHash = require("string-hash")

var url = "https://media.discordapp.net/attachments/417402196926398465/575759168347308035/3.png"
url = "https://cdn.discordapp.com/attachments/417402196926398465/575758109021306891/huehuehue.jpg"


var express = require("@runkit/runkit/express-endpoint/1.0.0");
var app = express(exports);

app.get("/:a/:b/:c", async (req, res) => {
    let url = "https://media.discordapp.net/attachments/"
    url += [req.params.a,req.params.b,req.params.c].join("/")
    
    let e = await axios.get(url)
    res.send(stringHash(e.data).toString())
    
    imageHash(url, 16, false, (err, data) => {
        res.send(data)
    })
})
*/
