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
}

async function on_message( message ){
	var input = message.content.toLowerCase()
	var parameters = message.content.split(" ")
	parameters.shift()

	if( message.content == "!neko" ){
		var meow = await axios.get("http://aws.random.cat/meow")
		message.reply(meow.data.file)
	}
	
	if( message.content == "!youtube" ){
		message.reply("wip")
	}
	
}

bot.login(process.env.anon)
