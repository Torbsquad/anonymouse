const { Command } = require("vnft-commandhandler");
const axios = require("axios");

const neko = new Command();
neko.name = "neko";
neko.funct = async (bot, message, args) => {
  var meow = await axios.get("http://aws.random.cat/meow");
  message.reply(meow.data.file);
};

module.exports = neko;
