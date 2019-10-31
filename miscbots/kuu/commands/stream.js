const { Command } = require('vnftjs')

const command = new Command()
command.name = 'stream'
command.addAlias('setStream')

command.funct = (plant, message, args) => {
  plant.user.setActivity(args, { url: 'https://www.twitch.tv/1' })
}

//module.exports = command
