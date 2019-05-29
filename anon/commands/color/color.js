const { Command } = require("vnftjs");

const color = new Command();
color.name = "color";
color.addAlias("colour");

color.funct = colorCommand;

function colorCommand(bot, message, args) {
  var target_member = message.guild.members.find(member => member.id == message.author.id);
  var colorrole = role => role.name == "Farbe" || role.name == target_member.name || role.name[0] == "ܿ";
  var target_role = target_member.roles.find(colorrole);
  if (!args.match(/^\[.{1,}?\,.{1,}?\,.{1,}?\]$/)) {
    target_role.setColor(args.toUpperCase());
  } else {
    target_role.setColor(JSON.parse(args));
  }
}

module.exports = color;
