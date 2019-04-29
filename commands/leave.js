const { Command } = require("vnft-commandhandler");

const leave = new Command();
leave.name = "leave";
leave.funct = function(bot, message, args) {
  message.channel.send(`${message.author.username} left.`);
};

module.exports = leave;
