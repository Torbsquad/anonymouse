const { CommandHandler } = require("vnft-commandhandler");
const path = require("path");

const plant = new CommandHandler();
plant.prefix = "p"

plant.loadCommands(path.join(__dirname,"commands"));
plant.login(process.env.plant);
