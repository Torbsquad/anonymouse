const { Script } = require('vnftjs')
const axios = require("axios")

const scout = new Script()

function readMessage(message){
  if(message.content){
    let emojis = message.content.match(/<(a|):.*?:.*?>/g)
    for(let emoji of emojis){
      await axios.get(`https://api.vnft.cc/emoji/add/${emoji}`)
    }
  }
}

scout.funct = b => {
  b.on('message', readMessage)
}

module.exports = scout
