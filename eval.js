// ¯\_(ツ)_/¯ easy debugging - time is money

// heh

/**
 * I mean, the discord-chat is already a giant commandline
 * so why not being able to inject code to quickly test something
 * 
 * dont judge me
 * 
 * usage: 
 * ```js
 * code
 * ```
 * authorisation very recommended tho, dangerous in wrong hands
 */

module.exports = (message) => {
    try{
        message.content.split("\`\`\`").filter(el=>el.startsWith("js\n")).forEach(el=>eval(el.substr(3)))
    }
    catch(err){
        message.reply(err.message)
    }
}