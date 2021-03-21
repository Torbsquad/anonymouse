function main(io){
    var _io = io.of("/tts/vanfriedricht")
    const tmi = require('tmi.js');
    const client = new tmi.Client({
        options: { debug: true },
        connection: { reconnect: true },
        identity: {
            username: process.env.cauldronebotUsername,
            password: process.env.cauldronebotPassword
        },
        channels: [ 'vanfriedricht' ]
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
        _io.emit('message', message)
    });
}

module.exports = main
