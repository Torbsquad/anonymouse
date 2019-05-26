const { CommandHandler } = require("vnftjs");
const path = require("path");

const client = new CommandHandler();
client.prefix = "dot";

client.loadCommands(path.join(__dirname, "commands"));
client.login(process.env.chocobot);
