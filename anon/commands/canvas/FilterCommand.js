const { Command } = require('vnftjs')
const loadCanvasByImage = require('./helperFunctions/loadCanvasByImage')
const Discord = require('discord.js')

class FilterCommand extends Command {
  constructor(filter) {
    super()
    this.bind(filter)
  }

  bind(filter) {
    this.funct = async (bot, message, args) => {
      const arrgs = args.split(' ')
      const canvas = await loadCanvasByImage(arrgs[1] || message.author.avatarURL)
      applyFilterToImageData(canvas, filter, arrgs[0])

      const attachment = new Discord.Attachment(canvas.toBuffer(), `FilterCommand-Image.png`)
      message.channel.send(``, attachment)
    }
  }

}

module.exports = FilterCommand
