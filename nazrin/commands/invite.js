const { Command } = require('vnftjs')

const command = new Command()
command.name = 'invite'
command.funct = (bot, message, args) => {
  message.reply("tbd")
}

module.exports = command
