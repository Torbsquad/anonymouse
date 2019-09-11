const { Command } = require('vnftjs')

const command = new Command()
command.name = 'sayd'
command.description = 'Replies with the text after sayd and __tries__ to delete the source-message'

command.funct = (client, message, args) => {
  message.channel.send(args)
  message.delete()
}

module.exports = command
