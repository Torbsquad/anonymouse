const sleep = require("../js/sleep.js");

module.exports = async (bot, message, args) => {
  let dices = { count: 1, sides: 6 };
  let dice_parameter = args.toLowerCase().match(/([0-9]{0,})d([0-9]{1,})/);
  if (dice_parameter && dice_parameter[1]) {
    dices.count = dice_parameter[1];
  }
  if (dice_parameter && dice_parameter[2]) {
    dices.sides = dice_parameter[2];
  }
  let response_text = `🎲${message.author} warf ${dices.count == 1 ? "einen " : dices.count}d${dices.sides}!`;
  let response = await message.channel.send(response_text);
  await sleep(1);
  let result = "🤔";
  if (dices.count == 1) {
    result = Math.floor(Math.random() * dices.sides + 1);
  } else {
    let sum = 0;
    let thrown_dices = [];
    while (dices.count-- > 0) {
      let dice = Math.floor(Math.random() * dices.sides + 1);
      sum += dice;
      thrown_dices.push(+dice);
    }
    result = `${thrown_dices.join(" + ")} = ${sum}`;
  }
  response_text += ` ${result}!`;
  response.edit(response_text);
};
