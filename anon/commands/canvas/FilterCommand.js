const { Command } = require('vnftjs')
const loadCanvasByImage = require('./helperFunctions/loadCanvasByImage')
const Discord = require('discord.js')
const applyFilterToImageData = require('./helperFunctions/applyFilterToImageData')

class FilterCommand extends Command {
  constructor(filter) {
    super()
    this.bind(filter)
  }

  bind(filter) {
    if (filter.length > 1) {
      this.funct = async (bot, message, args) => {
        if (message.mentions.users.array().length) {
          args = message.mentions.users.first().avatarURL
        }

        const arrgs = args.split(' ')
        const canvas = await loadCanvasByImage(arrgs[1] || message.author.avatarURL)
        applyFilterToImageData(canvas, filter, arrgs[0])

        const attachment = new Discord.Attachment(canvas.toBuffer(), `FilterCommand-Image.png`)
        message.channel.send(``, attachment)
      }
    } else {
      this.funct = async (bot, message, args) => {
        if (message.mentions.users.array().length) {
          args = message.mentions.users.first().avatarURL
        }

        const arrgs = args.split(' ')
        const canvas = await loadCanvasByImage(arrgs[0] || message.author.avatarURL)
        applyFilterToImageData(canvas, filter)

        const attachment = new Discord.Attachment(canvas.toBuffer(), `FilterCommand-Image.png`)
        message.channel.send(``, attachment)
      }
    }
  }
}

module.exports = FilterCommand
