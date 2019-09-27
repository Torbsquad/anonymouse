const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'me'

command.funct = async (bot, message, args) => {
  const userImg = await Canvas.loadImage(message.author.avatarURL)

  const canvas = Canvas.createCanvas(userImg.width, userImg.height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

module.exports = command
