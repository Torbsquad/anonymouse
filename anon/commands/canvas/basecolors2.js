const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'basecolors2'

command.funct = async (bot, message, args) => {
  const userImg = await Canvas.loadImage(message.author.avatarURL)

  const canvas = Canvas.createCanvas(userImg.width, userImg.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)

  let cxd = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(greyscale(cxd), 0, 0)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

function greyscale(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    let value = ( r + g + b )
    cxd.data[i] = r / value * 255
    cxd.data[i + 1] = g / value * 255
    cxd.data[i + 2] = b / value * 255
  }
  return cxd
}

module.exports = command
