const { Script } = require("vnft-commandhandler");

const monkaScript = new Script();

monkaScript.funct = (bot) => {
  const monkasId = "573255283044778009";
  const monkaS = bot.emojis.find(e => e.id == monkasId);
  
  bot.on("message", message => {
    let hasMonkas = message.content.match(/monkas/gi);
    if (hasMonkas && !message.author.bot) {
      message.channel.send(monkaS.toString());
    }
  });
};

module.exports = monkaScript;
