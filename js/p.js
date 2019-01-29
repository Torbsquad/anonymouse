module.exports = main

async function main(bot){
	var target_channel = bot.channels.find(c=>c.id=="539700451059171338")
	
	var axios = require("axios")

	var e = await axios.get(target_channel.topic)
	var b = e.data.items.filter(d=>d.user!="pr0gramm")

	var img = {
		suffix: b[0].image,
		type: datatype(b[0].image)
	}
	
	if(img.type){
		var link = `https://${img.type}.pr0gramm.com/${img.suffix}`
		var already_there = await does_already_contain(link,target_channel)
		if(!already_there){
	    	target_channel.send(link)
		}
	}
	
}

async function does_already_contain(message,channel){
	var messages = await channel.fetchMessages({limit:100})
	return messages.map(m=>m.content).some(m=>m==message)
}

function datatype(t){
	if(t.match(/.*?\.(gif|png|jpg)$/)){
		return "img"
	}
	if(t.match(/.*?\.(mp4)$/)){
		return "vid"
	}
	return false
}
