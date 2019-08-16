const pg = require('../../../db')

const { Command } = require('vnftjs')

const command = new Command()
command.name = 'db'
command.addUserWhitelist(u => u.id == '397063436049186818')

command.funct = async (bot, message, args) => {
  try {
    let query = args.replace(/\n/g," ")
    message.channel.send(query)
    let ergebnis = await pg.any(query)
    ergebnis = JSON.stringify(ergebnis, null, 2)
    message.channel.send('```' + ergebnis + '```')
  } catch (err) {
    message.channel.send(err.message)
  }
}

module.exports = command
