const pg = require('../../../db')

const { Command } = require('vnftjs')

const command = new Command()
command.name = 'db'
command.addUserWhitelist(u => u.id == '397063436049186818')

command.funct = async (bot, message, args) => {
  let ergebnis = await pg.any(args)
  ergebnis = JSON.stringify(ergebnis, null, 2)
  message.channel.send('```' + ergebnis + '```')
}

module.exports = command
