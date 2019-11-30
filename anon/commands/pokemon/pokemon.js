const { Command } = require('vnftjs')
const axios = require("axios")

const command = new Command()
command.name = 'pk'
command.funct = async (bot, message, args) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${args}`
  let request = await axios.get(url)
  
  var d = {}
  var f = request.data.stats.map(e=>[e.stat.name,e.base_stat])

  for(var o of f){
      d[o[0]] = o[1]
  }
  
  message.reply(JSON.stringify(d))
}

module.exports = command
