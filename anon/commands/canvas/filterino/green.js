const loadCanvasByImage = require('../helperFunctions/loadCanvasByImage')
const applyFilterToImageData = require('../helperFunctions/applyFilterToImageData')

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'green'

command.funct = async (bot, message, args) => {
  const canvas = await loadCanvasByImage(args || message.author.avatarURL)
  applyFilterToImageData(canvs, filter)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    cxd.data[i + 0] = 0
    cxd.data[i + 2] = 0
  }
  return cxd
}

module.exports = command
