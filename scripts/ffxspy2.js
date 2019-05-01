const { Script } = require("vnft-commandhandler");
const { get } = require("axios");

const TARGET_CHANNEL = "539802587239677963";
const TARGET_CHARACTERS = [16466788, 20859306, 20864548, 21349090, 21853274];
const TARGET_ATTRIBUTES = ["Name", "Server", "Race", "Gender"];

const test = new Script();
test.intervalTime = 60000;
test.funct = async bot => {
  let channel = bot.channels.find(c => c.id == TARGET_CHANNEL);
  let data = JSON.parse(channel.topic);

  for (let id of TARGET_CHARACTERS) {
    let char = (await get(`https://xivapi.com/character/${id}`)).data.Character;

    let chardata = {};
    TARGET_ATTRIBUTES.map(a => (chardata[a] = char[a]));

    let hasChanged = JSON.stringify(chardata) != JSON.stringify(data[id]);
    if (hasChanged) {
      let before = JSON.stringify(data[id]);
      let after = JSON.stringify(chardata);

      let msg = `${before}\nis now\n${after}`;
      channel.send(msg);
      channel.send(char.Portrait);

      data[id] = chardata;
    }
  }

  channel.setTopic(JSON.stringify(data));
};

module.exports = test;
