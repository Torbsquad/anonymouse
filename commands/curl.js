const { get } = require("axios");

async function curl(bot, message, url) {
  if (!url.startsWith("http")) {
    url = "http://" + url;
  }
  message.channel.send((await get(url)).data);
}

module.exports = curl;
