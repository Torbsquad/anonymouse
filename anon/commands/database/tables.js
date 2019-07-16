const pg = require('../../../db')

const { Command } = require('vnftjs')

const command = new Command()
command.name = 'tables'
command.addUserWhitelist(u => u.id == '397063436049186818')

command.funct = async (bot, message, args) => {
  let tables = await pg.any(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`)
  message.channel.send('```Tables:' + tables.map(t => `\n- ${t.table_name}`).join('') + '```')
}

module.exports = command
