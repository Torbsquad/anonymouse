const Canvas = require("canvas");
const Discord = require("discord.js");
const { Command } = require("vnft-commandhandler");
const starterUrls = {
  "Letzte Station": "img/stages/starters/letztestation.png",
  "Lylat-Patrouille": "img/stages/starters/lylatpatrouille.png",
  "Pokémon Stadium 2": "img/stages/starters/pokemonstadium2.png",
  Schlachtfeld: "img/stages/starters/schlachtfeld.png",
  "Smash-Stadt": "img/stages/starters/smashstadt.png"
};
const counterpickUrls = {
  "Kalos-Pokémon-Liga": "img/stages/counterpicks/kalopokemonliga.png",
  "Stadt & Großstadt": "img/stages/counterpicks/townandcity.png",
  "Einall-Pokémon-Liga": "img/stages/counterpicks/einallpokemonliga.png",
  "Yoshi’s Island": "img/stages/counterpicks/yoshisisland.png",
  "Yoshi’s Story": "img/stages/counterpicks/yoshisstory.png"
};

const att = new Command();
att.name = "aat";
att.funct = async (bot, message, args) => {
  let channelMeta = JSON.parse(message.channel.topic);
  let players = channelMeta.attendees.map(e => bot.users.find(u => u.id == e));
  let score = channelMeta.score;
  let strikes = channelMeta.strikes.split("");
  let screen = await stageScreen(players, score, starterUrls, counterpickUrls, strikes);
  message.channel.send(`preview:`, screen);
};

module.exports = [att];

async function stageScreen(players, score, starters, counterpicks = {}, strikes = []) {
  // das muss so
  const canvas = Canvas.createCanvas(100 * 5, 320);
  const ctx = canvas.getContext("2d");

  let p1 = await Canvas.loadImage(players[0].displayAvatarURL);
  let p2 = await Canvas.loadImage(players[1].displayAvatarURL);

  ctx.save();
  ctx.beginPath();
  ctx.arc(100, 60, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(p1, 50, 10, 100, 100);
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(400, 60, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(p2, 350, 10, 100, 100);
  ctx.restore();

  ctx.textAlign = "center";
  ctx.font = "bold 75px arial";
  ctx.fillStyle = "white";
  ctx.fillText(score.join(" - "), 250, 90);

  let x = 0;
  for (let i in starters) {
    let stageUrl = starterUrls[i];
    let stage = await Canvas.loadImage(stageUrl);
    ctx.drawImage(stage, x, 120, 100, 100);
    x += 100;
  }
  if (score.some(s => s != 0)) {
    x = 0;
    for (let i in counterpicks) {
      let stageUrl = counterpickUrls[i];
      let stage = await Canvas.loadImage(stageUrl);
      ctx.drawImage(stage, x, 220, 100, 100);
      x += 100;
    }
  }
  let strikeImg = await Canvas.loadImage("img/striked.png");
  for (let strike of strikes) {
    let x = (strike % 5) * 100;
    let y = Math.floor(strike / 5) * 100 + 120;
    ctx.drawImage(strikeImg, x, y, 100, 100);
  }

  // senden
  const attachment = new Discord.Attachment(canvas.toBuffer(), `yee.png`);
  return attachment;
}
