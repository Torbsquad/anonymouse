const { Command } = require('vnftjs')

const command = new Command()
command.name = 'say'
command.funct = (bot, message, args) => {
  message.channel.send(args)
}

module.exports = command
