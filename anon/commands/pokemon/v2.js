const { Command } = require('vnftjs')
const Discord = require('discord.js')
const axios = require('axios')

class PokeWiki {
  constructor(args) {
    this.name = args
  }
  async load() {
    let pokewiki_url = `https://www.pokewiki.de/${this.name}`
    let request = await axios.get(pokewiki_url)
    this.data = request.data
    this.squashed = this.data.split('\n').join('')
    return this.data
  }
  async load2(){
    var a = await axios.get(`https://www.serebii.net/pokedex-swsh/${this.english.toLowerCase()}/`)
    var b = a.data.split("\n").join(" ").replace(/\s+/g," ")
    var c = b.match(/Stats.{1,100}h2.*?table>/g)
    var d = c.map(d=>{
        return d.match(/Base Stats - Total: (.*?)<\/tr>/)[1].replace(/<.*?>/g,"")
    })
    return d
  }
  get english() {
    let e = this.data.match(/title=\"Englisch\">en<\/span><span.*?>(.*?)<\/span><\/div>/)[1]
    return e
  }
  get german() {
    let e = this.data.match(/span style="padding:4px 0px 2px 0px;display: inline-block;"><b>(.*?)<\/b><\/span/)[1]
    return e
  }
  get typing() {
    let t = this.squashed.match(/Allgemeine Informationen.*?style="background:#ffffff">(.*?)Fangen/)[1]
    t = t
      .match(/<a href="\/.*?" title="(.*?)"><img alt=".*?\.png"/g)
      .map(e => e.match(/<a href="\/.*?" title="(.*?)"><img alt=".*?\.png"/)[1])
    return t.join(', ')
  }
  get image() {
    let a = this.squashed.match(/float: right.{1,100}pokemon_icon.{1,100}<img(.*?)\/div/g)[0]
    a = a.match(/src=\"(.*?)\"/)[1]
    return 'https://www.pokewiki.de' + a
  }
}

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
    var e = await p.load2()
    message.channel.send(p.german)
    message.channel.send(p.english)
    message.channel.send({ file: p.image })
    message.channel.send(JSON.stringify(e))
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
