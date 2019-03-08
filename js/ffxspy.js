const Discord = require("discord.js")
var ls = require('lodestonejs')
var random_numbers = [16466788,20859306,20864548,21349090,21853274]
var bot = ""
module.exports = main

async function main(b){
  bot = b
  setInterval(function(){
    bot.channels.filter(c=>c.name=="👀").forEach(stalk)
  },/*5*60**/10*1000);
}

async function stalk(channel){
  var richtext = new Discord.RichEmbed();
  richtext.setColor("b6dd8c")
  richtext.setThumbnail(data.avatar)
  richtext.setImage(data.portrait)
  
  var content = []
  var dinge = ["id","title","world","race","gender","clan"]
  var memory = JSON.parse(channel.topic)

  
  for(let random_number of random_numbers){
    ls(random_number,(err, data)=>{
      for( var ding of dinge ){
        content.push(`**${ding}**: ${data[ding]||"keins lol"}`)
      }
      var result = content.join("\n")
      
      if(memory[random_number] != result){
        memory[random_number] = result
        channel.setTopic(JSON.stringify(memory))
        richtext.addField(data.name,result)
        channel.send('@everyone',{embed:richtext})
      }
      
      message.channel.send(data.name)
    })
  }
  
}
