const { Command } = require('vnftjs')

const command = new Command()
command.name = 'leave'
command.funct = function(bot, message, args) {
  message.channel.send(`${message.author.username} left.`)
}

module.exports = command
