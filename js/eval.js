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
        message.content.split("\`\`\`").filter(el=>el.startsWith("js\n")).forEach(el=>evalorino(el.substr(3)))
    }
    catch(err){
        message.reply(err.message)
    }
}

function evalorino(el){
    var schleep = "var sleep = time=>new Promise((res,rej)=>{setTimeout(function(){res()},time*1000)})\n"
    if( el.includes("//noasync") ){
        eval(schleep+el)
    }
    else{
        eval(schleep+`async function main(){${el}}main()`)
    }
}