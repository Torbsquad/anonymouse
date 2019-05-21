var { imageHash } = require("image-hash")

function asyncImageHash(uri){
    return new Promise((res, rej)=>{
        imageHash(uri,64,true,(e,d)=>{res(d)})
    })
}

async function emojiAnalysis(string){
    let emoji = {}
    let splittedEmoji = string.match(/<(a|):(\d*?):(.*?):>/)
    
    emoji.animated = splittedEmoji[1] == "a"
    emoji.id = splittedEmoji[2]
    emoji.name = splittedEmoji[3]
    emoji.datatype = emoji.animated ? "gif" : "png"
    emoji.url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.datatype}`;
    emoji.hash = await asyncImageHash(emoji.url)
    
    return emoji
}

module.exports = emojiAnalysis
