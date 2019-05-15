const Canvas = require("canvas");

class Stage {
  constructor(stageurl) {
    this.image = false;
    this.loadImage(stageurl);
  }
  async loadImage(stageurl) {
    this.image = await Canvas.loadImage(stageurl);
  }
}

module.exports = Stage;
