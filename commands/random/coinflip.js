const { Command } = require("vnftjs");
const sleep = require("../../js/sleep");

const coinflip = new Command();
coinflip.name = "coinflip";
coinflip.funct = async (bot, message, args) => {
  let flipText = `${message.author} warf eine Münze!`;
  let response = await message.channel.send(flipText);
  await sleep(1);
  let coin = Math.round(Math.random()) ? "Kopf" : "Zahl";
  flipText += ` ${coin}!`;
  response.edit(flipText);
};

module.exports = coinflip;
