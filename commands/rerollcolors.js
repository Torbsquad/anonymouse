const { Command } = require("vnft-commandhandler");

const reroll = new Command();
reroll.name = "rerollcolors";
reroll.funct = (bot, message, args) => {
  var target_guild = message.guild;
  var target_roles = target_guild.roles.filter(r => r.name[0] == "ܿ");

  target_roles.forEach(role => role.setColor("RANDOM"));
};

module.exports = reroll;
