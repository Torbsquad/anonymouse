const { Command } = require('vnftjs')
const loadCanvasByImage = require('./helperFunctions/loadCanvasByImage')

class FilterCommand extends Command {
  constructor(filter) {
    super()
    this.funct = async (bot, message, args) => {
      const canvas = await loadCanvasByImage(args || message.author.avatarURL)
      applyFilterToImageData(canvas, filter)

      const attachment = new Discord.Attachment(canvas.toBuffer(), `FilterCommand-Image.png`)
      message.channel.send(``, attachment)
    }
  }
}

module.exports = FilterCommand
