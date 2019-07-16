const { Command } = require('vnftjs')

const command = new Command()
command.name = 'sayd'
command.funct = (bot, message, args) => {
  message.channel.send(args)
  message.delete()
}

module.exports = command
