const { Script } = require('vnftjs')
const { sleep } = require('vnft-tools')

const script = new Script()

function tick(bot){
  bot.user.setActivity(new Date().toString().split(" ")[4])
}

script.funct = async bot => {
  await sleep(10000)
  setInterval(function(){tick(bot)},5000)
}

module.exports = script
