const { Command } = require("vnftjs");
const { get } = require("axios");

const neko = new Command();
neko.name = "neko";
neko.funct = async (bot, message, args) => {
  var nekoSite = await get("http://aws.random.cat/meow");
  message.reply(nekoSite.data);
};

module.exports = neko;
