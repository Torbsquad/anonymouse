const { Script } = require('vnftjs')
const axios = require('axios')

const script = new Script()

async function getEmojis(message) {
  message = message.match(/<(a|):.*?:.*?>/g)
  if (!message) {
    return false
  }
  if (!Array.isArray(message)) {
    message = [message]
  }
  for (let emoji of message) {
    await axios.get(`https://api.vnft.cc/emoji/add/${emoji}`)
  }
}

script.funct = bot => {
  bot.on('raw', e => {
    if (e.t == 'MESSAGE_CREATE') getEmojis(e.d.content)
  })
}

module.exports = script
