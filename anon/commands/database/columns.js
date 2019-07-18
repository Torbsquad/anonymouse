const pg = require('../../../db')

const { Command } = require('vnftjs')

const command = new Command()
command.name = 'columns'
command.addUserWhitelist(u => u.id == '397063436049186818')

command.funct = async (bot, message, args) => {
  let results = await pg.any(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' and table_name=$1`,
    args,
  )

  function fillup(text, length) {
    while (text.length < length) {
      text += ' '
    }
    return text
  }

  function repeattext(text, length) {
    let result = ''
    while (length-- > 0) {
      result += text
    }
    return result
  }

  let namesLength = Math.max(...results.map(t => t.column_name.length))
  let typesLength = Math.max(...results.map(t => t.data_type.length))

  let response = [
    `╒═${repeattext('═', namesLength)}══╤═${repeattext('═', typesLength)}══╕`,
    `│ ${fillup('name', namesLength)}  │ ${fillup('type', typesLength)}  │`,
    `╞═${repeattext('═', namesLength)}══╪═${repeattext('═', typesLength)}══╡`,
  ]
  for (let result of results) {
    response.push(`│ ${fillup(result.column_name, namesLength)}  │ ${fillup(result.data_type, typesLength)}  │`)
  }
  response.push(`└─${repeattext('─', namesLength)}──┴─${repeattext('─', typesLength)}──┘`)

  message.channel.send('```' + response.join('\n') + '```')
}

module.exports = command
