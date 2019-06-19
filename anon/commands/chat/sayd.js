const { Command } = require('vnftjs')

const sayd = new Command()
sayd.name = 'sayd'
sayd.funct = (bot, message, args) => {
  message.channel.send(args)
  message.delete()
}

module.exports = sayd
