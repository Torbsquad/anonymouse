const { Command } = require('vnftjs')
const Discord = require("discord.js")
const axios = require("axios")

function asBar(value, icons = 16){
  let result = ""
  let filled = "🟩"
  let empty = "⬛"
  for(let i = 0; i < icons; i++){
    result += value > i*256/icons ? filled : empty
  }
  return result + " " + value
}

const command = new Command()
command.name = 'pk'
command.funct = async (bot, message, args) => {
  try{
    let pokewiki_url = `https://www.pokewiki.de/${args}`
    let pokewiki = await axios.get(pokewiki_url)

    let name = pokewiki.data.match(/title=\"Englisch\">en<\/span><span.*?>(.*?)<\/span><\/div>/)[1].toLowerCase()

    let url = `https://pokeapi.co/api/v2/pokemon/${name}`
    let request = await axios.get(url)

    let pokemon = request.data
    let stats = {}
    pokemon.stats.map(e=>{stats[e.stat.name] = e.base_stat})
    
    let embed = new Discord.RichEmbed()
    let abilities = pokemon.abilities.sort((a,b)=>a.is_hidden>b.is_hidden).map(e=>`${e.ability.name}${e.is_hidden?' (hidden)':''}`).join(", ")
    let image = pokemon.sprites.front_default

    embed.addField("Name", pokemon.name)
    embed.addField("Abilities", abilities)
    embed.addField("Base HP", asBar(stats.hp))
    embed.addField("Base Attack", asBar(stats.attack))
    embed.addField("Base Defense", asBar(stats.defense))
    embed.addField("Base Special Attack", asBar(stats["special-attack"]))
    embed.addField("Base Special Defense", asBar(stats["special-defense"]))
    embed.addField("Base Speed", asBar(stats.speed))
    embed.setColor("RED")
    embed.setImage(image)

    message.reply("",embed)
  }
  catch(err){
    message.reply(err.message)
  }
}

module.exports = command
