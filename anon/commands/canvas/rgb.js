const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'rgb'

command.funct = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(50, 50)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = args
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `color ${args}.png`)
  message.channel.send(`Color ${args} looks like this:`, attachment)
}

module.exports = command
