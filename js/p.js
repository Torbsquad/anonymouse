module.exports = main
var sleep = time=>new Promise((res,rej)=>{setTimeout(function(){res()},time*1000)})

async function main(bot){
	var prochans = bot.channels.find(channel=>channel.type=="category"&&channel.name=="pr0gramm").children
	while(true){
		for(var prochan of prochans){
			tick(prochan)
			await sleep(60)
		}
	}
}


async function tick(channel){
	var target_channel = channel
	
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
