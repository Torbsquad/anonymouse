const SmashScreen = require("../class/SmashScreen");
const StageCollection = require("../class/StageCollection");
const Player = require("../class/Player");
const { Command } = require("vnft-commandhandler");

const starterStages = new StageCollection("smash/img/stages/starters/");
starterStages.addStage("Letzte Station", "letztestation.png");
starterStages.addStage("Lylat-Patrouille", "lylatpatrouille.png");
starterStages.addStage("Pokémon Stadium 2", "pokemonstadium2.png");
starterStages.addStage("Schlachtfeld", "schlachtfeld.png");
starterStages.addStage("Smash-Stadt", "smashstadt.png");

const counterpickStages = new StageCollection("smash/img/stages/counterpicks/");
counterpickStages.addStage("Kalos-Pokémon-Liga", "kalopokemonliga.png");
counterpickStages.addStage("Stadt & Großstadt", "townandcity.png");
counterpickStages.addStage("Einall-Pokémon-Liga", "einallpokemonliga.png");
counterpickStages.addStage("Yoshi’s Island", "yoshisisland.png");
counterpickStages.addStage("Yoshi’s Story", "yoshisstory.png");

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

  screen.addStages(starterStages);
  if (player1.score != 0 || player2.score != 0) {
    screen.addStages(counterpickStages);
  }

  message.channel.send("", await screen.draw());
};

module.exports = a;
