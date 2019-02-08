/****************************
 * in loving memory of anon *
 ****************************/

const Discord = require("discord.js")
const bot = new Discord.Client()

const sleep = require("./js/sleep")

const Cleverbot = require('cleverbot.io')

const fs = require("fs")
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
        try{
            commands[prefix+name] = require(`${__dirname}/commands/${file}`)
        }
        catch(err){
            bot.channels.find(c=>c.id=="265207562360717329").send(err.message)
        }
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
        try{
            commands[input.command.ci](bot, message, input.parameters.raw)
        }
        catch(err){
            bot.channels.find(c=>c.id=="265207562360717329").send(err.message)
        }
    }

    //  eval block
    if( bot.admins.includes(message.author.id) ){
        require("./js/eval.js")(bot, message)
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
