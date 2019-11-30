const { Command } = require('vnftjs')
const axios = require("axios")

const command = new Command()
command.name = 'pk'
command.funct = async (bot, message, args) => {
  let pokewiki_url = `https://www.pokewiki.de/${args}`
  let pokewiki = await axios.get(pokewiki_url)

  let name = pokewiki.data.match(/<b>(.*?)<\/b>/g)[2].match(/<b>(.*?)<\/b>/)[1]
  
  
  let url = `https://pokeapi.co/api/v2/pokemon/${name}`
  let request = await axios.get(url)
  
  let p = request.data
  var d = {}
  var f = p.stats.map(e=>{d[e.stat.name] = e.base_stat})
  d.name = p.name
  d.image = p.data.sprites.front_default
  d.abilities = p.abilities.sort(e=>e.is_hidden).map(e=>`${e.ability.name}${e.is_hidden?' (hidden)':''}`).join(", ")
  
  message.reply(JSON.stringify(d,null,2))
}

module.exports = command
