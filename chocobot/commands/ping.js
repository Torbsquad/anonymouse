const { Command } = require("vnft-commandhandler");

const ping = new Command();
ping.name = "ping";
ping.funct = (bot, message, args) => {
  message.reply("pong");
};

module.exports = ping;
