const got = require("got");

async function curl(bot, message, url) {
  if (!url.startsWith("http")) {
    url = "http://" + url;
  }
  message.channel.send((await got(url)).body);
}

module.exports = curl;
