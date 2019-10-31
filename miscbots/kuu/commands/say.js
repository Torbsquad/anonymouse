const { Command } = require('vnftjs')

const command = new Command()
command.name = 'say'

command.addUserWhitelist(u => u.id == '397063436049186818')
command.funct = (plant, message, args) => {
  message.channel.send(args)
}

module.exports = command
