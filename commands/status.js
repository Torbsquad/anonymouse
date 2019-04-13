module.exports = (bot, message, args) => {
  var color_to_status = {
    grün: "online",
    gelb: "idle",
    rot: "dnd",
    grau: "invisible"
  };
  bot.user.setStatus(color_to_status[args]);
};
