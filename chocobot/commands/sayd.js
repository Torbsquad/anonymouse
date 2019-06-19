const { Command } = require('vnftjs')

const sayd = new Command()
sayd.name = 'sayd'
sayd.description = 'Replies with the text after sayd and __tries__ to delete the source-message'

sayd.funct = (client, message, args) => {
  message.channel.send(args)
  message.delete()
}

module.exports = sayd
