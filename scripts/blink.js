const { Script } = require("vnftjs");
const { sleep } = require("vnft-tools");

const blink = new Script();

blink.funct = async bot => {
  bot.user.setStatus("dnd")
  await sleep(500);
  bot.user.setStatus("online")
}

module.exports = blink;