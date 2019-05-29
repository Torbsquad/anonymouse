const { Script } = require("vnftjs");

const plant = new Script();
plant.funct = bot => {
  bot.on("message", message => {
    if( message.content.toLowerCase() == ".login plant" ){
      require("../../../plant/main.js")
    }
  })
};

module.exports = plant;
