const { Command } = require('vnftjs')

const command = new Command()
command.name = "calc"

var rights = [
  "397063436049186818",
  "209675727098871809",
  "210709949993451520",
  "181493250350252033",
  "529646358764716047"
]

command.addUserWhitelist( u => rights.includes(u.id))

command.funct = (bot, message, args) => {
  message.reply(eval(args))
}

module.exports = command
