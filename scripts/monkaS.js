const { Script } = require("vnft-commandhandler");

const monkaScript = new Script();

monkaScript.funct = (bot) => {
  const monkasId = "573255283044778009";
  const monkaS = bot.emojis.find(e => e.id == monkasId);
  
  bot.on("message", message => {
    let content = message.content
    content += content.split("").reverse().join("")
    content += message.attachments.map(a=>a.filename).join("")
    
    let monkaCount = ( content.match(/m[^a-z]*?[0o][^a-z]*?n[^a-z]*?k[^a-z]*?[a4][^a-z]*?[s5]/gi) || [] ).length
    monkaCount += ( content.match(/3.png/gi) || [] ).length
    
    if (monkaCount && !message.author.bot) {
      let response = new Array(monkaS.toString()).fill(monkaCount.toString());
      message.channel.send(response.join(" "));
    }
  });
};

module.exports = monkaScript;
