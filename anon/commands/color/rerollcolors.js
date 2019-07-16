const { Command } = require('vnftjs')

const command = new Command()
command.name = 'rerollcolors'
command.funct = (bot, message, args) => {
  var target_guild = message.guild
  var target_roles = target_guild.roles.filter(r => r.name[0] == 'ܿ')

  target_roles.forEach(role => role.setColor('RANDOM'))
}

module.exports = command
