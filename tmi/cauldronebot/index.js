require('dotenv').config()
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	connection: { reconnect: true },
	identity: {
		username: process.env.cauldronebotUsername,
		password: process.env.cauldronebotPassword
	},
	channels: [ 'liwyc_raphael', 'nucleusnine', 'vonfriedricht', 'vanfriedricht', 'lucky30_' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if(self) return;
    if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, howdy!`);
	}
    
    if(message.toLowerCase() === '!dice' || message.toLowerCase() == "!dés") {
        var number = Math.random()
        var digits = 6
        number = Math.floor(number*digits)+1
		client.say(channel, `@${tags.username}, ${number}`);
	}

    if(message.toLowerCase() === 'botcheck') {
		client.say(channel, `no`);
	}
});
