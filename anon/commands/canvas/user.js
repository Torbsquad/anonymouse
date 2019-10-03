const loadCanvasByImage = require('./filterino/helperFunctions/loadCanvasByImage')

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'me'

command.funct = async (bot, message, args) => {
  const canvas = await loadCanvasByImage(args || message.author.avatarURL)
  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

module.exports = command
