const { Command } = require('vnftjs')

const command = new Command()
command.name = 'setusername'

command.funct = (bot, message, args) => {
  bot.user.setUsername(args)
}

module.exports = command
