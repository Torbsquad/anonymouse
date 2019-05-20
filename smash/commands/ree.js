const SmashScreen = require("../class/SmashScreen");
const Player = require("../class/Player");
const { Command } = require("vnft-commandhandler");

const stages = require("../stages");

const a = new Command();
a.name = "a";
a.funct = async (bot, message, args) => {
  let screen = new SmashScreen();

  let player1 = new Player(bot.users.find(u => u.id == "423937510423527425"));
  let player2 = new Player(bot.users.find(u => u.id == "535483764395081759"));

  player1.score = 1;
  player2.score = 0;

  screen.addPlayer(player1);
  screen.addPlayer(player2);

  screen.addStages(stages.starters);
  if (player1.score != 0 || player2.score != 0) {
    screen.addStages(stages.counterpicks);
  }

  message.channel.send("", await screen.draw());
};

module.exports = a;
