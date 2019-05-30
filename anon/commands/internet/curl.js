const got = require("got");

async function curl(bot, message, url) {
  if (!url.startsWith("http")) {
    url = "http://" + url;
  }
  const curlSite = await got(url)
  message.channel.send(curlSite.body);
}

module.exports = curl;
