const { Command } = require("vnftjs");
const analyse = require("../js/emojiAnalysis");

const analyseEmoji = new Command();
analyseEmoji.name = "analyse";
analyseEmoji.funct = async (bot, message, args) => {
  message.channel.send("`"+JSON.stringify(await analyse(args))+"`")
};

module.exports = analyseEmoji;
