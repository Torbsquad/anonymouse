const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'moustache'

command.funct = async (bot, message, args) => {
  if( message.mentions.users.array().length ){
    args = message.users.first().avatarURL
  }

  const userImg = await Canvas.loadImage(args || message.author.avatarURL)
  const moustache = await Canvas.loadImage('./anon/img/moustache.png')
  
  const canvas = Canvas.createCanvas(userImg.width, userImg.height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(moustache, 0, 0, canvas.width, canvas.height)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

module.exports = command
