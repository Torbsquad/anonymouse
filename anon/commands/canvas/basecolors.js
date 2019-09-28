const loadCanvasByImage = require("./helperFunctions/loadCanvasByImage")
const applyFilterToImageData = require("./helperFunctions/applyFilterToImageData")

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'basecolors'

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
    cxd.data[i] = r > g && r > b ? r : 0
    cxd.data[i + 1] = g > b && g > r ? g : 0
    cxd.data[i + 2] = b > r && b > g ? b : 0
  }
  return cxd
}

module.exports = command
