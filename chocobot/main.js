const { CommandHandler } = require("vnftjs");
const path = require("path");

const bot = new CommandHandler();

bot.loadCommands(path.join(__dirname, "commands"));
bot.login(process.env.chocobot);
