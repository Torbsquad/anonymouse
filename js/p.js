module.exports = main

async function main(bot){
	var target_channel = bot.channels.find(c=>c.id=="539700451059171338")
	console.log(target_channel)
}
