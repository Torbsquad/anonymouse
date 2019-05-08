const { Script } = require("vnft-commandhandler");

const monkaScript = new Script();

monkaScript.funct = (bot) => {
  const monkasId = "573255283044778009";
  const monkaS = bot.emojis.find(e => e.id == monkasId);
  
  bot.on("message", message => {
    let content = message.content
    content += content.split("").reverse().join("")
    
    const monkasMatches = content.match(/m[^a-z]*?[0o][^a-z]*?n[^a-z]*?k[^a-z]*?[a4][^a-z]*?[s5]/gi)
    
    let monkaCount = ( monkasMatches || [] ).length;
    
    if (monkaCount && !message.author.bot) {
      let response = new Array(monkaCount).fill(monkaCount.toString());
      message.channel.send(response.join(" "));
    }
  });
};

module.exports = monkaScript;
