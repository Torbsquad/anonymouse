const { Command } = require("vnft-commandhandler");

const login = new Command();
login.name = "psay";

login.funct = (bot, message, args) => {
  if( typeof plant != "undefined" ){
    plant.channels.find(c=>c.id==message.channel.id).send(args)
  }
}

module.exports = login;
