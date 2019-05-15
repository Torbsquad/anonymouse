const Avatar = require("./Player");
const Discord = require("discord.js");
const Canvas = require("canvas");

class SmashScreen {
  constructor() {
    this.players = [];
    this.stages = [];
  }
  addPlayer(player) {
    this.players.push(player);
  }

  drawScore(ctx, players) {
    ctx.textAlign = "center";
    ctx.font = "bold 75px arial";
    ctx.fillStyle = "white";
    ctx.fillText(players.map(p => p.score).join(" - "), 250, 90);
  }

  addStages(stagecollection) {
    this.stages.push(stagecollection);
  }

  async draw() {
    const canvas = Canvas.createCanvas(500, 320);
    const ctx = canvas.getContext("2d");

    await Promise.all(this.players.map(p => p.loadImage()));

    this.players[0].draw(ctx, 100, 60, 50);
    this.players[1].draw(ctx, 400, 60, 50);

    this.drawScore(ctx, this.players);

    let number = 0;
    let y = 120;

    for (let stagecollection of this.stages) {
      let x = 0;
      console.log(stagecollection);
      for (let stage of stagecollection.stages) {
        ctx.drawImage(stage.image, x, y, 100, 100);
        x += 100;
        number++;
      }
      y += 100;
    }

    const attachment = new Discord.Attachment(canvas.toBuffer(), `stageselect.png`);
    return attachment;
  }
}

module.exports = SmashScreen;
