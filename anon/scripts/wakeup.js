const { Script } = require('vnftjs')
const { sleep } = require('vnft-tools')

const script = new Script()

script.funct = async bot => {
  bot.user.setActivity('Hi!')
  await sleep(5000)
  bot.user.setActivity('')
}

module.exports = script
