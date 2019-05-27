const { CommandHandler } = require("vnftjs");
const path = require("path");

const client = new CommandHandler();
client.prefix = "beemoviescript";

client.enableHelp();
client.helpColor = "rgb(247,225,57)";

client.loadCommands(path.join(__dirname, "commands"));
client.login(process.env.chocobot);
