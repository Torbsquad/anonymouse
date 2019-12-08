const { Command } = require('vnftjs')
const Discord = require('discord.js')
const axios = require('axios')

const command = new Command()
command.name = 'pp'
command.funct = async (bot, message, args) => {
  if (!args) {
    message.reply('Usage: .pp Pokemon-Name')
    return false
  }
  try {
    let request = await axios.get(`https://api.vnft.cc/pk/${args}`)
    let data = request.data
    message.channel.send(JSON.stringify(data,null,2))
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
