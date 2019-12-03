const { Command } = require('vnftjs')
const Discord = require('discord.js')
const axios = require('axios')

const command = new Command()
command.name = 'pp'
command.funct = async (bot, message, args) => {
  try {
    let pokewiki_url = `https://www.pokewiki.de/${args}`
    let pokewiki = await axios.get(pokewiki_url)

    let name = pokewiki.data.match(/title=\"Englisch\">en<\/span><span.*?>(.*?)<\/span><\/div>/)[1].toLowerCase()
    message.reply(args)
    message.reply(name)
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
