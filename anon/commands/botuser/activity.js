const { Command } = require('vnftjs')

const command = new Command()
command.name = 'setActivity'
command.addAlias('activity')
command.description = "Setting Activity from bot"

command.funct = (bot, message, args) => {
  bot.user.setActivity(args)
}

command.addUserWhitelist(u => u.id == '397063436049186818')

module.exports = command
