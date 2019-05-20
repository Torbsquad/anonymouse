const StageCollection = require("./class/StageCollection");

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

module.exports = {
  starters: starterStages,
  counterpicks: counterpickStages
};
