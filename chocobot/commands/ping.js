const { Command } = require("vnftjs");

const ping = new Command();
ping.name = "ping";
ping.funct = (bot, message, args) => {
  message.reply("pong");
};

module.exports = ping;
