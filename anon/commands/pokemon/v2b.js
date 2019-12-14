const { Command } = require('vnftjs')
const Discord = require('discord.js')
const axios = require('axios')
const Canvas = require('canvas')

const command = new Command()
command.name = 'pc'
command.funct = async (bot, message, args) => {
  if (!args) {
    message.reply('Usage: .pc Pokemon-Name')
    return false
  }
  try {
    let request = await axios.get(`https://api.vnft.cc/pk/${args}`)
    let data = request.data
    for (var variant of data.variants) {
      const canvas = Canvas.createCanvas(256, 256)
      const ctx = canvas.getContext('2d')
      ctx.fillRect(0, 0, variant.stats.hp, 10)
      ctx.fillRect(0, 10, variant.stats.atk, 10)
      ctx.fillRect(0, 20, variant.stats.def, 10)
      ctx.fillRect(0, 30, variant.stats.spatk, 10)
      ctx.fillRect(0, 40, variant.stats.spdef, 10)
      ctx.fillRect(0, 50, variant.stats.speed, 10)
      ctx.fill(0, 0, canvas.width, canvas.height)

      const attachment = new Discord.Attachment(canvas.toBuffer(), `${args}.png`)
      await message.channel.send(`\> ${variant.name}:`, attachment)
    }
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
