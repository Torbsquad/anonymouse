const { CommandHandler } = require("vnftjs");
const path = require("path");

const client = new CommandHandler();
client.prefix = "beemoviescript";

client.loadCommands(path.join(__dirname, "commands"));
client.login(process.env.chocobot);
