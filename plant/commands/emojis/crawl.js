const { Command } = require("vnftjs");

const crawl = new Command();
crawl.name = "crawl";

crawl.funct = async (client, message, args) => {
  let messages = await message.channel.fetchMessages({limit: args});
  let messagesWithEmoji = messages.filter(m => m.content.match(/<(a|):(.*?):(.*?)>/));
  
  message.channel.send(messagesWithEmoji.length);
};

module.exports = crawl;
