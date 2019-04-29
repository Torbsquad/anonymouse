/****************************
 * in loving memory of anon *
 ****************************/

const path = require("path");

const { CommandHandler } = require("vnft-commandhandler");
const bot = new CommandHandler();

bot.on("ready", () => {
  console.log("bless anon's soul");
});

bot.admins = typeof process.env.admins != "undefined" ? process.env.admins.split(",") : [];

bot.loadCommands(path.join(__dirname, "commands"));
bot.loadScripts(path.join(__dirname, "js"));

bot.login(process.env.anon);

require("./js/web");
