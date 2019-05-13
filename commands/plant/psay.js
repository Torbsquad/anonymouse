const { Command } = require("vnft-commandhandler");

const psay = new Command();
psay.name = "psay";

psay.funct = (bot, message, args) => {
  if( typeof plant != "undefined" ){
    plant.channels.find(c=>c.id==message.channel.id).send(args)
  }
}


const psayd = new Command();
psayd.name = "psayd";

psayd.funct = (bot, message, args) => {
  if( typeof plant != "undefined" ){
    plant.channels.find(c=>c.id==message.channel.id).send(args)
  }
  message.delete()
}

module.exports = [psay, psayd];
