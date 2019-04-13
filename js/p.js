var sleep = time =>
  new Promise((res, rej) => {
    setTimeout(function() {
      res();
    }, time * 1000);
  });
var axios = require("axios");

module.exports = main;

async function main(bot) {
  while (true) {
    var prochans = bot.channels
      .find(channel => channel.type == "category" && channel.name == "pr0gramm")
      .children.array();
    for (var prochan of prochans) {
      try {
        tick(prochan);
        await sleep(60);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

async function tick(channel) {
  var e = await axios.get(encodeURI(channel.topic));
  var b = e.data.items.filter(d => d.user != "pr0gramm");

  var img = {
    suffix: b[0].image,
    type: datatype(b[0].image)
  };

  console.log(`img 4 ${channel.name} w/ ${JSON.stringify(img)}`);

  if (img.type) {
    var link = `https://${img.type}.pr0gramm.com/${img.suffix}`;
    var already_there = await does_already_contain(link, channel);
    if (!already_there) {
      console.log(`trying to send ${link}`);
      channel.send(link);
    }
  }
}

async function does_already_contain(message, channel) {
  var messages = await channel.fetchMessages({ limit: 100 });
  return messages.map(m => m.content).some(m => m == message);
}

function datatype(t) {
  if (t.match(/.*?\.(gif|png|jpg)$/)) {
    return "img";
  }
  if (t.match(/.*?\.(mp4)$/)) {
    return "vid";
  }
  return false;
}
