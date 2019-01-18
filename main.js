/****************************
 * in loving memory of anon *
 ****************************/

Discord = require("discord.js")
bot = new Discord.Client()

axios = require("axios")

Cleverbot = require('cleverbot.io')

cbot = new Cleverbot(process.env.cleverbot_user, process.env.cleverbot_key)
cbot.is_ready = false
cbot.setNick('AnonsSpirit');

bot.on("ready", on_ready)
bot.on("message", on_message)
bot.on("error", on_error)

async function on_ready(){
	console.log("bless anon's soul")
	cbot.create((err, s)=>{ cbot.is_ready = true })
	bot.admins = typeof process.env.admins != "undefined" ? process.env.admins.split(",") : []
}

async function on_message( message ){
	var input = message.content.toLowerCase()
	var parameters = message.content.split(" ")
	parameters.shift()

	//  neko command
	if( message.content == ".neko" ){
		var meow = await axios.get("http://aws.random.cat/meow")
		message.reply(meow.data.file)
	}
	
	//  youtube command
	if( message.content == ".yt" ){
		message.reply("wip")
	}
	
	//  say and delete command
	if( message.content.startsWith(".sayd ") ){
		var parameter = message.content.substr(".sayd ".length)
		message.channel.send(parameter)
		message.delete()
	}

	//  eval block
	if( bot.admins.includes(message.author.id) ){
		require("./js/eval.js")(message)
	}
	
	//  cleverbot responses at cleverbot channel
	var is_cleverbot_channel = !!message.channel.topic && message.channel.topic.toLowerCase().includes("cleverbot")
	if( is_cleverbot_channel ){
		var ignorelist = [/^t!/,/^$/,/^!/,/^\./,/^#/]
		var content_not_in_ignorelist = !ignorelist.some(e=>message.content.match(e))
		if( cbot.is_ready && !message.author.bot && content_not_in_ignorelist ){
			message.channel.startTyping()
			cbot.ask(message.content, (err, response)=>{
				message.channel.send(response)
				message.channel.stopTyping()
			})
		}
	}
}

async function on_error( err ){
	console.log("on_error @ discord-anon",err)
}

bot.login(process.env.anon)
require("./js/web")
