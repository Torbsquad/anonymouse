const { Script } = require('vnftjs')

const script = new Script()
script.funct = bot => {
  bot.user.setStatus("idle")
}

module.exports = script
