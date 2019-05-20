const { Command } = require("vnftjs");

const psay = new Command();
psay.name = "say";

psay.funct = (plant, message, args) => {
  message.channel.send(args);
};

module.exports = psay;
