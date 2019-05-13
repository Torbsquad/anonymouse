const { Command } = require("vnft-commandhandler");

const say = new Command();
say.name = "say";
say.funct = (bot, message, args) => {
  message.channel.send(args);
};

const sayd = new Command();
sayd.name = "sayd";
sayd.funct = (bot, message, args) => {
  message.channel.send(args);
  message.delete();
};

module.exports = [say, sayd];
