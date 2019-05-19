const { Command } = require("vnft-commandhandler");

const psay = new Command();
psay.name = "say";

psay.funct = (plant, message, args) => {
  message.channel.send(args);
};

module.exports = psay;
