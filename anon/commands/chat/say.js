const { Command } = require('vnftjs')

const say = new Command()
say.name = 'say'
say.funct = (bot, message, args) => {
  message.channel.send(args)
}

module.exports = say
