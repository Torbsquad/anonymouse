const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'me'

command.funct = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(100, 100)
  const ctx = canvas.getContext('2d')

  const userImg = Canvas.loadImage(message.author.avatarURL)

  ctx.fillStyle = args
  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

module.exports = command
