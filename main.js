/****************************
 * in loving memory of anon *
 ****************************/

Discord = require("discord.js")
bot = new Discord.Client()

axios = require("axios")
sleep = require("./js/sleep")

Cleverbot = require('cleverbot.io')

fs = require("fs")
var commands = {}

bot.on("ready",()=>{
	try{on_ready()}
	catch(err){console.log("on_ready error:",err)}
})

bot.on("message",(message)=>{
	try{on_message(message)}
	catch(err){console.log("on_message error:",err)}
})

bot.on("error",(err)=>{
	try{on_error(err)}
	catch(err){console.log("on_error error:",err)}
})

async function on_ready(){
	console.log("bless anon's soul")
	require("./js/p.js")(bot)
	require("./js/ffxspy.js")(bot)
	if( cbot.is_active ){
		cbot.create((err, s)=>{ cbot.is_ready = true })
	}
	bot.admins = typeof process.env.admins != "undefined" ? process.env.admins.split(",") : []

    var files = fs.readdirSync(`${__dirname}/commands/`)
    var prefix = "."
    files.forEach(file=>{
	var name = file.match(/(.*?)\.js$/)[1]
        commands[prefix+name] = require(`${__dirname}/commands/${file}`)
    })
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
	
    if( commands[input.command.ci] ){
       commands[input.command.ci](bot, message, input.parameters.raw)
    }
    
	
	//  youtube command
	if( input.command.ci == ".yt" ){
		var search = input.parameters.cs.join(" ")
		var url = encodeURI(`https://www.youtube.com/results?search_query=${search}`)
		var youtube_video_id = /"\/watch\?v=(.*?)"/.exec((await axios.get(url)).data)[1]
		message.reply(`https://www.youtube.com/watch?v=${youtube_video_id}`)
	}

	// color-command
	if( [".color",".colour"].includes(input.command.ci) ){
		var target_member = message.guild.members.find(member => member.id == message.author.id)
		var colorrole = role => role.name == "Farbe" || role.name == target_member.name || role.name[0] == "ܿ"
		var target_role = target_member.roles.find(colorrole)
		if( !input.parameters.raw.match(/^\[.{1,}?\,.{1,}?\,.{1,}?\]$/) ){
			target_role.setColor(input.parameters.raw.toUpperCase())
		}
		else{
			target_role.setColor(JSON.parse(input.parameters.raw))
		}
	}
	if( [".colors",".colours"].includes(input.command.ci) ){
		var response = `__ColorResolvable:__
			Hexadezimalausdrücke als Zahl oder Wort
			→ (\`#123ABC\`, \`0x123ABC\`, \`123ABC\`, ...)

			eigentlich auch Ganzzahl selbst,.... eigentlich

			RGB-Liste also [R,G,B]
			→ (\`[255,0,255]\`, \`[123, 234, 45]\`)

			Oder einer dieser Farben: *(in .color wird klein geschriebenes groß)*
			→ \`DEFAULT\`, \`AQUA\`, \`GREEN\`, \`BLUE\`, \`PURPLE\`, \`LUMINOUS_VIVID_PINK\`, \`GOLD\`, \`ORANGE\`, \`RED\`, \`GREY\`, \`DARKER_GREY\`, \`NAVY\`, \`DARK_AQUA\`, \`DARK_GREEN\`, \`DARK_BLUE\`, \`DARK_PURPLE\`, \`DARK_VIVID_PINK\`, \`DARK_GOLD\`, \`DARK_ORANGE\`, \`DARK_RED\`, \`DARK_GREY\`, \`LIGHT_GREY\`, \`DARK_NAVY\`, \`RANDOM\``
		message.channel.send(response.replace(/\n\t+/g,"\n"))
		
		message.channel.send("https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable")
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
	
	if( input.command.ci == ".temp" ){
		let city = input.parameters.raw
		let apiKey = process.env.open_weather_map_token
		let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=${apiKey}`
		
		try{
		    wetter = await axios.get(apiUrl)
		    message.reply(`Es ist in ${city} ${wetter.data.main.temp}°C`)
		}
		catch(err){
		    message.reply(err.message)
		}
	}
	
	if( input.command.ci == ".dice" ){
		let dices = {count: 1, sides: 6}
		let dice_parameter = input.parameters.raw.match(/([0-9]{0,})d([0-9]{1,})/)
		if( dice_parameter && dice_parameter[1] ){
			dices.count = dice_parameter[1]
		}
		if( dice_parameter && dice_parameter[2] ){
			dices.sides = dice_parameter[2]
		}
		let response_text = `🎲${message.author} warf ${dices.count == 1? "einen " : dices.count}d${dices.sides}!`
		let response = await message.channel.send(response_text)
		await sleep(1)
		let result = "🤔"
		if( dices.count == 1 ){
			result = Math.floor(Math.random()*dices.sides+1)
		}
		else{
			let sum = 0
			let thrown_dices = []
			while( dices.count-->0 ){
				let dice = Math.floor(Math.random()*dices.sides+1)
				sum += dice
				thrown_dices.push(+dice)
		      	}
			result = `${thrown_dices.join(" + ")} = ${sum}`
		}
		response_text += ` ${result}!`
		response.edit(response_text)
	}
	
	if( input.command.ci == ".coinflip" ){
		let response_text = `${message.author} warf eine Münze!`
		let response = await message.channel.send(response_text)
		await sleep(1)
		let coin = Math.round(Math.random()) ? "Kopf" : "Zahl"
		response_text += ` ${coin}!`
		response.edit(response_text)
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
