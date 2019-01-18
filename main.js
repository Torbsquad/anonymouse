/****************************
 * in loving memory of anon *
 ****************************/

Discord = require("discord.js")
bot = new Discord.Client()

axios = require("axios")

Cleverbot = require('cleverbot.io')

cleverbot_client = new Cleverbot(process.env.cleverbot_user, process.env.cleverbot_key)
cleverbot_client.my_body_is_ready = false
cleverbot_client.setNick('AnonsSpirit');

bot.on("ready", on_ready)
bot.on("message", on_message)
bot.on("error", on_error)

async function on_ready(){
	console.log("bless anon's soul")
	cleverbot_client.create((err, s)=>{ cleverbot_client.my_body_is_ready = true })
	bot.admins = typeof process.env.admins != "undefined" ? process.env.admins.split(",") : []
}

async function on_message( message ){
	var input = message.content.toLowerCase()
	var parameters = message.content.split(" ")
	parameters.shift()

	if( message.content == ".neko" ){
		var meow = await axios.get("http://aws.random.cat/meow")
		message.reply(meow.data.file)
	}
	
	if( message.content == ".yt" ){
		message.reply("wip")
	}
	
	if( message.content.startsWith(".sayd ") ){
		var parameter = message.content.substr(".sayd ".length)
		message.channel.send(parameter)
		message.delete()
	}

	if( bot.admins.includes(message.author.id) ){
		require("./eval.js")(message)
	}
	
	if( message.channel.topic.includes("Cleverbot") ){
		if( typeof cleverbot_client.my_body_is_ready && message.author.bot == false ){
			cleverbot_client.ask(message.content, (err, r) => {
				message.channel.send(r)
			})
		}
	}
}

async function on_error( err ){
	console.log("on_error @ discord-anon",err)
}

bot.login(process.env.anon)
require("./web")
