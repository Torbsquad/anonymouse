const loadCanvasByImage = require('./filterino/helperFunctions/loadCanvasByImage')

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'moustache'

command.funct = async (bot, message, args) => {
  if (message.mentions.users.array().length) {
    args = message.mentions.users.first().avatarURL
  }

  const canvas = await loadCanvasByImage(args || message.author.avatarURL)
  const ctx = canvas.getContext('2d')
  const moustache = await Canvas.loadImage('./anon/img/moustache.png')
  ctx.drawImage(moustache, 0, 0, canvas.width, canvas.height)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

module.exports = command
