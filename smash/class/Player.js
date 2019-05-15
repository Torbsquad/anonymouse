const Canvas = require("canvas");

class Player {
  constructor(user) {
    this.user = user;
    this.score = 0;
  }

  async loadImage() {
    if (!this.image) {
      this.image = await Canvas.loadImage(this.user.displayAvatarURL);
    }
    return this.image;
  }

  draw(ctx, x, y, r) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(this.image, x - r, y - r, r * 2, r * 2);
    ctx.restore();
  }
}

module.exports = Player;
