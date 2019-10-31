const { Script } = require('vnftjs')

const script = new Script()
script.funct = bot => {
  bot.user.setStatus('idle')
  bot.user.setActivity('vnft.cc')
}

module.exports = script
