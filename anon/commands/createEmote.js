const { Command } = require('vnftjs')

const command = new Command()
command.name = 'createEmote'
command.funct = async (bot, message, args) => {
  try{
    let a = args.split(" ")
    message.guild.createEmoji(a[1], a[0])
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
