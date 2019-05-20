const { Command } = require("vnftjs");

const stream = new Command();
stream.name = "stream";
stream.addAlias("setStream");

stream.funct = (plant, message, args) => {
  plant.user.setActivity(args, { url: "https://www.twitch.tv/1" });
};

module.exports = stream;
