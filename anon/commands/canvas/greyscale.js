const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'greyscale'

command.funct = async (bot, message, args) => {
  const userImg = await Canvas.loadImage(args || message.author.avatarURL)

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
    cxd.data[i] = (r + g + b) / 3
    cxd.data[i + 1] = (r + g + b) / 3
    cxd.data[i + 2] = (r + g + b) / 3
  }
  return cxd
}

module.exports = command
