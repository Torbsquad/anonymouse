/****************************
 * in loving memory of anon *
 ****************************/

Discord = require("discord.js")
bot = new Discord.Client()

axios = require("axios")

Cleverbot = require('cleverbot.io')

bot.on("ready", on_ready)
bot.on("message", on_message)
bot.on("error", on_error)

async function on_ready(){
	console.log("bless anon's soul")
	if( cbot.is_active ){
		cbot.create((err, s)=>{ cbot.is_ready = true })
	}
	bot.admins = typeof process.env.admins != "undefined" ? process.env.admins.split(",") : []
}

async function on_message( message ){
	var input = {
		command: {
			cs: message.content.split(" ")[0], 						// case-senstivie, unmodified
			ci: message.content.toLowerCase().split(" ")[0]			// case-insenstivie, pushed to lowercase
		},
		parameters: {
			cs: message.content.split(" ").slice(1),				// case-senstivie, unmodified
			ci: message.content.toLowerCase().split(" ").slice(1)	// case-insenstivie, pushed to lowercase
		}
	}
	
	//  neko command
	if( input.command.ci == ".neko" ){
		var meow = await axios.get("http://aws.random.cat/meow")
		message.reply(meow.data.file)
	}
	
	//  youtube command
	if( input.command.ci == ".yt" ){
		var search = input.parameters.cs.join(" ")
		var url = encodeURI(`https://www.youtube.com/results?search_query=${search}`)
		var youtube_video_id = /"\/watch\?v=(.*?)"/.exec((await axios.get(url)).data)[1]
		message.reply(`https://www.youtube.com/watch?v=${youtube_video_id}`)
	}
	
	//  say and delete command
	if( input.command.ci == ".sayd " ){
		var response = input.parameters.cs.join(" ")
		message.channel.send(response)
		message.delete()
	}

	//  eval block
	if( bot.admins.includes(message.author.id) ){
		require("./js/eval.js")(message)
	}
	
	//  cleverbot responses at cleverbot channel
	var is_cleverbot_channel = !!message.channel.topic && message.channel.topic.toLowerCase().includes("cleverbot")
	if( cbot.is_ready && ( is_cleverbot_channel || message.isMentioned(bot.user) ) ){
		var ignorelist = [/^t!/,/^$/,/^!/,/^\./,/^\/\//,/```js/]
		var content_not_in_ignorelist = !ignorelist.some(e=>message.content.match(e))
		if( !message.author.bot && content_not_in_ignorelist ){
			message.channel.startTyping()
			cbot.ask(message.content, (err, response)=>{
				response = response.replace(/\*/g,"\\*")
				message.channel.send(response)
				message.channel.stopTyping()
			})
		}
	}
}

async function on_error( err ){
	console.log("on_error @ discord-anon",err)
}

if( !!process.env.cleverbot_user && !!process.env.cleverbot_key ){
	cbot = new Cleverbot(process.env.cleverbot_user, process.env.cleverbot_key)
	cbot.is_ready = false
	cbot.is_active = true
	cbot.setNick('AnonsSpirit');
}
else{
	cbot = {}
	cbot.is_ready = false
	cbot.is_active = false
}

bot.login(process.env.anon)
require("./js/web")
