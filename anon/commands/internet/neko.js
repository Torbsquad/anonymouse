const { Command } = require('vnftjs')
const { get } = require('axios')

const command = new Command()
command.name = 'neko'
command.funct = async (bot, message, args) => {
  var nekoSite = await get('http://aws.random.cat/meow')
  message.reply(nekoSite.data)
}

module.exports = command
