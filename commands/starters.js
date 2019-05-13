const Canvas = require("canvas")
const Discord = require("discord.js")
const { Command } = require("vnft-commandhandler");
const stageUrls = [
	"https://cdn.discordapp.com/attachments/447872161798160394/572454654210867200/unknown.png",
	"https://cdn.discordapp.com/attachments/447872161798160394/572454269589127190/unknown.png",
	"https://cdn.discordapp.com/attachments/447872161798160394/572454146993553408/unknown.png",
	"https://cdn.discordapp.com/attachments/447872161798160394/572454942728519701/unknown.png",
	"https://cdn.discordapp.com/attachments/447872161798160394/572454432948617227/unknown.png"
]

const starters = new Command();
starters.name = "starters";
starters.funct = async (bot, message, args) => {
	// das muss so
	const canvas = Canvas.createCanvas(1250, 250);
	const ctx = canvas.getContext('2d');

	// durchzählen der urls
	for(let i in stageUrls ){
		let stageUrl = stageUrls[i];
		let stage = await Canvas.loadImage(stageUrl);
		// male das stagebild mit (i*250|0) als punkt oben links, dann das bild 250x250 groß
		ctx.drawImage(stage, i*250, 0, 250, 250);
	}

	// senden
	const attachment = new Discord.Attachment(canvas.toBuffer(), `starters.png`);
	message.channel.send(`Starters:`, attachment);
}

module.exports = starters;
