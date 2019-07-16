const pg = require('../../../db')

const { Command } = require('vnftjs')

const command = new Command()
command.name = 'columns'
command.addUserWhitelist(u => u.id == '397063436049186818')

command.funct = async (bot, message, args) => {
  let columns = await pg.any(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' and table_name=$1`,
    'bepis',
  )
  message.channel.send('```' + JSON.stringify(columns, null, 2) + '```')
}

module.exports = command
