module.exports = ()=>{}

/*const ls = require("lodestonejs");
const toSee = [16466788, 20859306, 20864548, 21349090, 21853274];
const toFetch = ["id", "world", "race", "gender", "clan"];
const Discord = require("discord.js");

module.exports = function(bot) {
  setInterval(
    main,
    100000,
    bot.channels.find(c => c.name == "👀"),
    toSee,
    toFetch
  );
};

async function main(channel, target_ids, target_attributes) {
  var memory = JSON.parse(channel.topic);
  for (let id of target_ids) {
    console.log(id);
    var char = await getlstatus(target_attributes, id);
    if (!memory[id] || memory[id] != char.string) {
      console.log("!!!");
      memory[id] = char.string;

      var richtext = new Discord.RichEmbed();

      richtext.setThumbnail(char.data.avatar);
      richtext.setImage(char.data.portrait);
      richtext.addField(char.data.name, char.string);

      channel.send("@everyone", { embed: richtext });
    }
    await channel.setTopic(JSON.stringify(memory));
  }
}

async function getlstatus(toFetch, uid) {
  let char = await als(uid);
  return {
    string: toFetch.map(f => `${f}: ${char[f]}`).join("\n"),
    data: char
  };
}

function als(args) {
  return new Promise((resolve, reject) => {
    ls(args, (err, data) => resolve(data));
  });
}

/*const Discord = require("discord.js")
var ls = require('lodestonejs')
var random_numbers = [16466788,20859306,20864548,21349090,21853274]
var bot = ""
module.exports = main

async function main(b){
  bot = b
  setInterval(function(){
    bot.channels.filter(c=>c.name=="👀").forEach(stalk)
  },100000);
}

async function stalk(channel){
  var richtext = new Discord.RichEmbed();
  richtext.setColor("b6dd8c")
  
  var content = []
  var dinge = ["id","title","world","race","gender","clan"]
  var memory = JSON.parse(channel.topic)

  
  for(let random_number of random_numbers){
    ls(random_number,(err, data)=>{
      content = []
      richtext.setThumbnail(data.avatar)
      richtext.setImage(data.portrait)
      
      for( var ding of dinge ){
        content.push(`**${ding}**: ${data[ding]||"keins lol"}`)
      }
      var result = content.join("\n")
      
      if(memory[random_number] != result){
        memory[random_number] = result
        channel.setTopic(JSON.stringify(memory))
        richtext.addField(data.name,result)
        channel.send('@ everyone',{embed:richtext})
      }
      
      message.channel.send(data.name)
    })
  }
  
}
*/
