const { CommandHandler } = require("vnftjs");
const path = require("path");

const client = new CommandHandler();
client.prefix = "beemoviescript";

client.enableHelp();
client.helpColor = [247,225,57];

client.loadCommands(path.join(__dirname, "commands"));
client.loadScripts(path.join(__dirname, "scripts"));
client.login(process.env.chocobot);
