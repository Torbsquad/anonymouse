const loadCanvasByImage = require('../helperFunctions/loadCanvasByImage')
const applyFilterToImageData = require('../helperFunctions/applyFilterToImageData')

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'invert'

command.funct = async (bot, message, args) => {
  const canvas = await loadCanvasByImage(args || message.author.avatarURL)
  applyFilterToImageData(canvas, filter)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    cxd.data[i] = 255 - r
    cxd.data[i + 1] = 255 - g
    cxd.data[i + 2] = 255 - b
  }
  return cxd
}

module.exports = command
