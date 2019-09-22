const Canvas = require('canvas')
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'filter'

command.funct = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(100, 100)
  const ctx = canvas.getContext('2d')

  const userImg = await Canvas.loadImage(message.author.avatarURL)
  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)

  let cxd = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(filter(cxd), 0, 0)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  let avgs = new Array()
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    avgs.push((r + g + b) / 3)
  }
  message.channel.send([cxd.height, cxd.width])
  for (let y = 0; y < cxd.height; y++) {
    for (let x = 0; x < cxd.width; x++) {
      let p = getPixel(cxd, avgs, x, y)
      if (getPixel(cxd, avgs, x, y) < 100) {
        p = 0
      }
      cxd.data[(x + y * cxd.width) * 4] = p
      cxd.data[(x + y * cxd.width) * 4 + 1] = p
      cxd.data[(x + y * cxd.width) * 4 + 2] = p
    }
  }
  return cxd
}

function getPixel(cxd, data, x, y) {
  if (x < 0 || y < 0 || x >= cxd.width || y >= cxd.height) return 0
  let i = x + y * cxd.width
  return data[i]
}

module.exports = command
