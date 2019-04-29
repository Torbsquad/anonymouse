const { Command } = require("vnft-commandhandler");

const activity = new Command();
activity.name = "setActivity";
activity.funct = (bot, message, args) => {
  bot.user.setActivity(args);
};

module.exports = activity;
