const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'text'

command.funct = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(100, 100)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = "white"
  ctx.font = "2em sans-serif"
  ctx.textBaseline = "Top"
  ctx.textAlign = "left"
  ctx.fillText(args,10,10)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `a.png`)
  message.channel.send(args, attachment)
}

module.exports = command
