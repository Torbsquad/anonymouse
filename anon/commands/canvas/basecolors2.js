const loadCanvasByImage = require('./helperFunctions/loadCanvasByImage')
const applyFilterToImageData = require('./helperFunctions/applyFilterToImageData')

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'basecolors2'

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
    let value = r + g + b
    cxd.data[i] = (r / value) * 127 * 3
    cxd.data[i + 1] = (g / value) * 127 * 3
    cxd.data[i + 2] = (b / value) * 127 * 3
  }
  return cxd
}

module.exports = command
