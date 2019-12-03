class PokeWiki {
  constructor(args) {
    this.name = args
  }
  async load() {
    let pokewiki_url = `https://www.pokewiki.de/${this.name}`
    let request = await axios.get(pokewiki_url)
    this.data = request.data
    return this.data
  }
  get english() {
    let e = this.data.match(/title=\"Englisch\">en<\/span><span.*?>(.*?)<\/span><\/div>/)[1].toLowerCase()
    return e
  }
  get image() {
    let a = this.data.match(/<div style=\"float: right;\"><img(.*?)\/div/g)[0]
    a = a.match(/src=\"(.*?)\"/)[1]
    return 'https://www.pokewiki.de' + a
  }
}

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
    let p = new PokeWiki(args)
    await p.load()

    message.reply(p.image)
    message.reply(p.english)
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
