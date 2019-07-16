const { Command } = require('vnftjs')

const command = new Command()
command.name = 'invite'

command.funct = (bot, message, args) => {
  let id = bot.user.id
  let link = `https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=1073744896`
  message.reply(link)
}

module.exports = command
