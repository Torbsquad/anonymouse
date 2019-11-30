const { Command } = require('vnftjs')
const axios = require("axios")

const command = new Command()
command.name = 'pk'
command.funct = async (bot, message, args) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${args}`
  let request = await axios.get(url)
  
  let p = request.data
  var d = {}
  var f = p.stats.map(e=>{d[e.stat.name] = e.base_stat})
  d.name = p.name
  d.abilities = p.abilities.sort(e=>e.is_hidden).map(e=>`${e.ability.name}${e.is_hidden?' (hidden)':''}`).join(", ")
  
  message.reply(JSON.stringify(d,null,2))
}

module.exports = command
