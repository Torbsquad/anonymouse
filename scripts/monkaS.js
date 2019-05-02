const { Script } = require("vnft-commandhandler");

const monkaScript = new Script();

monkaScript.funct = (bot) => {
  const monkasId = "573255283044778009";
  const monkaS = bot.emojis.find(e => e.id == monkasId);
  
  bot.on("message", message => {
    let countMonkas = ( message.content.match(/monkas/gi) || [] ).length;
    if (countMonkas && !message.author.bot) {
      let response = ""
      for (let i = 0; i < countMonkas; i++) {
        response += monkaS.toString()
      }
      message.channel.send(response);
    }
  });
};

module.exports = monkaScript;
