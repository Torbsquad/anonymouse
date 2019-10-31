const { CommandHandler } = require('vnftjs')
const client = new CommandHandler()

//client.loadCommands('./commands')
client.loadScripts('./miscbots/kuu/scripts')

client.login(process.env.plant)
