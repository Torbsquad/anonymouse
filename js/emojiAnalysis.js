var { imageHash } = require("image-hash");

function asyncImageHash(uri) {
  return new Promise((res, rej) => {
    imageHash(uri, 16, false, (e, d) => {
      res(d);
    });
  });
}

async function emojiAnalysis(string) {
  let emoji = {};
  let splittedEmoji = string.match(/<(a|):(.*?):(\d*?)>/);

  if (splittedEmoji) {
    emoji.animated = splittedEmoji[1] == "a";
    emoji.name = splittedEmoji[2];
    emoji.id = splittedEmoji[3];
    emoji.datatype = emoji.animated ? "gif" : "png";
    emoji.url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.datatype}`;
    emoji.hash = await asyncImageHash(emoji.url);
    if(!emoji.hash){
      let url = `https://cdn.discordapp.com/emojis/${emoji.id}.png`;
      emoji.hash = await asyncImageHash(url);
    }
  }

  return emoji;
}

module.exports = emojiAnalysis;
