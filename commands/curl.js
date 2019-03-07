axios = require("axios")

async function curl(bot, message, url){
    if( !url.startsWith("http") ){
        url = "http://"+url
    }
    message.channel.send( (await axios.get(url)).data )
}

module.exports = curl
