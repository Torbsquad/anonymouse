module.exports = main

async function main(bot){
	var target_channel = bot.channels.find(c=>c.id=="539700451059171338")
	
	var axios = require("axios")

	var e = await axios.get(target_channel.topic)
	var b = e.data.items.filter(d=>d.user!="pr0gramm")

	if(b[0].image.match(/.*?\.(gif|png|jpg)$/)){
	    target_channel.send("https://img.pr0gramm.com/"+b[0].image)
	}
	if(b[0].image.match(/.*?\.(mp4)$/)){
	    target_channel.send("https://vid.pr0gramm.com/"+b[0].image)
	}
}
