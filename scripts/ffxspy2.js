const { Script } = require("vnft-commandhandler");
const { get } = require("axios");
const { RichEmbed } = require("discord.js");

const TARGET_CHANNEL = "539802587239677963";
const TARGET_CHARACTERS = [16466788, 20859306, 20864548, 21349090, 21853274];
const TARGET_ATTRIBUTES = ["Name", "Server", "Race", "Gender"];

const attribute_translations = {
  "Name": ["Genderless", "Male", "Female"],
  "Server": ["Zero",1,2,"Lalafell","Miqo'te",5,"Au Ra"]
}

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
      let response = new RichEmbed();
      
      for( let attribute of TARGET_ATTRIBUTES ){
        let before = data[id][attribute] || "null";
        let after = chardata[attribute] || "null";
        
        if( attribute_translations[attribute]){
          if( attribute_translations[attribute][before] ){
            before = attribute_translations[attribute][before]
          }
          if( attribute_translations[attribute][after] ){
            after = attribute_translations[attribute][after]
          }
        }
        
        if( before == after ){
          richtext.addField(attribute, after);
        }
        else{
          richtext.addField(attribute, `${before} -> **${after}**`);
        }
      }
      
      channel.send("@everyone", {embed: response});
      channel.send({file: char.Portrait});

      data[id] = chardata;
    }
  }

  channel.setTopic(JSON.stringify(data));
};

module.exports = test;
