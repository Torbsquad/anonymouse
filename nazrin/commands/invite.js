const { Command } = require('vnftjs')

const command = new Command()
command.name = 'invite'
command.funct = (bot, message, args) => {
  message.reply('https://discordapp.com/oauth2/authorize?client_id=553204804843864084&scope=bot&permissions=1073744896')
}

module.exports = command
