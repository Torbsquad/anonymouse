const { Script } = require('vnftjs')

const reee = new Script()
reee.funct = bot => {
  console.log(bot.users.find(u => u.username == 'VonFriedricht').id)
}

module.exports = reee
