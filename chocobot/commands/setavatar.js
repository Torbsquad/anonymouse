const { Command } = require('vnftjs')

const command = new Command()
command.name = 'setavatar'

command.funct = (bot, message, args) => {
  bot.user.setAvatar(args)
}

module.exports = command
