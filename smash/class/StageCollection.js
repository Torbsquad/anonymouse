const Stage = require("./Stage");

class StageCollection {
  constructor(path) {
    this.path = path;
    this.stages = [];
  }
  addStage(name, file) {
    this.name = name;
    this.stages.push(new Stage(this.path + file));
  }
}

module.exports = StageCollection;
