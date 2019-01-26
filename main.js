/****************************
 * in loving memory of anon *
 ****************************/

Discord = require("discord.js")
bot = new Discord.Client()

axios = require("axios")

Cleverbot = require('cleverbot.io')

bot.on("ready", _on_ready)
bot.on("message", _on_message)
bot.on("error", _on_error)


function _on_ready(){
	try{
		on_ready()
	}
	catch(err){
		console.log("on_ready error:",err)
	}
}
async function on_ready(){
	console.log("bless anon's soul")
	if( cbot.is_active ){
		cbot.create((err, s)=>{ cbot.is_ready = true })
	}
	bot.admins = typeof process.env.admins != "undefined" ? process.env.admins.split(",") : []
}

function _on_message(message){
	try{
		on_message(message)
	}
	catch(err){
		console.log("on_message error:",err)
	}
}
async function on_message( message ){
	var input = {
		command: {
			// case-senstivie, unmodified
			cs: message.content.split(" ")[0],
			// case-insenstivie, pushed to lowercase
			ci: message.content.toLowerCase().split(" ")[0]
		},
		parameters: {
			// case-senstivie, unmodified
			cs: message.content.split(" ").slice(1),
			// case-insenstivie, pushed to lowercase
			ci: message.content.toLowerCase().split(" ").slice(1),
			// complete ((without)) split
			raw: message.content.split(" ").slice(1).join(" ")
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

	// color-command
	if( input.command.ci == ".color" || input.command.ci == ".colour" ){
		var target_member = message.guild.members.find(member => member.id == message.author.id)
		var target_role = target_member.roles.find(role => role.name == "Farbe")
		if( !input.parameters.includes("[") ){
			target_role.setColor(input.parameters.raw.toUpperCase())
		}
		else{
			target_role.setColor(JSON.parse(input.parameters.raw))
		}
	}
	
	//  say and delete command
	if( input.command.ci == ".sayd" ){
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
		var question = message.cleanContent
		
		var content_not_in_ignorelist = !ignorelist.some(e=>question.match(e))
		question = question.split(bot.user.username).join(cbot.nick).replace(/@/g,"")
		if( !message.author.bot && content_not_in_ignorelist ){
			message.channel.startTyping()
			cbot.ask(question, (err, response)=>{
				response = response.replace(/\*/g,"\\*")
				message.channel.send(response)
				message.channel.stopTyping()
			})
		}
	}
}

function _on_error(err){
	try{
		on_error(err)
	}
	catch(err){
		console.log("on_error error:",err)
	}
}
async function on_error( err ){
	console.log("on_error @ discord-anon",err)
}

// if no cleverbot.io token is given, should no cleverbot be prepared
if( !!process.env.cleverbot_user && !!process.env.cleverbot_key ){
	// loging in at cleverbot
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

// loging in at discord
bot.login(process.env.anon)
require("./js/web")
