const { Command } = require("vnftjs");
const got = require("got");

const neko = new Command();
neko.name = "neko";
neko.funct = async (bot, message, args) => {
  var nekoSite = await got("http://aws.random.cat/meow");
  message.reply(JSON.parse(nekoSite.body));
};

module.exports = neko;
