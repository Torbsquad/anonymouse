const { Script } = require("vnftjs");
const got = require("got");

const monkaScript = new Script();

monkaScript.funct = bot => {
  const monkasId = "573255283044778009";
  const monkaS = bot.emojis.find(e => e.id == monkasId);
  const monkaHash = [
    "4d0762077b3378c33c1b0bdd03decc210fe81ffa383a018e1fe187e3801f00bf",
    "1468151451",
    "2434766319",
    "2284100025",
    "3080738599"
  ];

  bot.on("message", async message => {
    let content = message.content;
    content += content
      .split("")
      .reverse()
      .join("");

    const images = message.attachments.map(a => a.url);

    let monkaCount = (content.match(/m[^a-z]*?[0o][^a-z]*?n[^a-z]*?k[^a-z]*?[a4][^a-z]*?[s5]/gi) || []).length;

    for (let image of images) {
      let urlsnippet = image.match(/\/[0-9]*?\/[0-9]*?\/.*?$/);
      if (urlsnippet) {
        let hash = (await got("https://untitled-p9bey7ap3m46.runkit.sh/" + urlsnippet[0])).body.toString();
        console.log(hash);
        if (monkaHash.includes(hash)) {
          monkaCount++;
        }
      }
    }

    if (monkaCount && !message.author.bot) {
      let response = new Array(monkaCount).fill(monkaS.toString());
      message.channel.send(response.join(" "));
    }
  });
};

module.exports = monkaScript;
