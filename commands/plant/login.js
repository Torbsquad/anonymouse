const { Command } = require("vnft-commandhandler");

const login = new Command();
login.name = "login";

login.funct = (bot, message, args) => {
  if (args.toLowerCase() == "plant") {
    const Discord = require("discord.js");

    plant = new Discord.Client();
    plant.login(process.env.plant);
  }
}

module.exports = login;
