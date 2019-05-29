const { Script } = require("vnftjs");
const Cleverbot = require("cleverbot.io");

const cleverbot = new Script();

cleverbot.user = new Cleverbot(process.env.cleverbot_user, process.env.cleverbot_key);
cleverbot.is_ready = false;
cleverbot.bot = "";
cleverbot.funct = bot => {
  cleverbot.bot = bot;
  let hasTokens = !!process.env.cleverbot_user && !!process.env.cleverbot_key;
  if (hasTokens) {
    cleverbot.user.setNick("AnonsSpirit");
    cleverbot.user.create((err, s) => {
      cleverbot.is_ready = true;
    });

    bot.on("message", message => {
      var cleverbotChannel = !!message.channel.topic && message.channel.topic.toLowerCase().includes("cleverbot");
      if (cleverbot.is_ready && (cleverbotChannel || message.isMentioned(bot.user))) {
        cleverbot.onMessage(message);
      }
    });
  }
};

cleverbot.onMessage = message => {
  var ignorelist = [/^t!/, /^$/, /^!/, /^\./, /^\/\//, /```js/];
  var question = message.cleanContent;

  var shouldIgnore = ignorelist.some(e => question.match(e));
  question = question
    .split(cleverbot.bot.user.username)
    .join(cleverbot.user.nick)
    .replace(/@/g, "");
  if (!message.author.bot && !shouldIgnore) {
    message.channel.startTyping();
    cleverbot.user.ask(question, (err, response) => {
      response = response.replace(/\*/g, "\\*");
      message.channel.send(response);
      message.channel.stopTyping();
    });
  }
};

async function on_message(message) {
  //  eval block
  if (bot.admins.includes(message.author.id)) {
    require("./js/eval.js")(bot, message);
  }
}

module.exports = cleverbot;
