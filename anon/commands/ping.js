const { Command } = require('vnftjs')

const command = new Command()
command.name = 'ping'
command.description = 'answers "pong"'

command.funct = (bot, message, args) => {
  message.reply('pong')
}

module.exports = command
