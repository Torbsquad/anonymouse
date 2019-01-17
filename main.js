/****************************
 * in loving memory of anon *
 ****************************/

Discord = require("discord.js")
bot = new Discord.Client()

axios = require("axios")

bot.on("ready", on_ready)
bot.on("message", on_message)

async function on_ready(){
	console.log("bless anon's soul")
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

	if( bot.admins.includes(message.author.id) ){
		require("./eval.js")(message)
	}
	
}

bot.login(process.env.anon)
require("./web")
