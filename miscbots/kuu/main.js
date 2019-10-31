const { CommandHandler } = require('vnftjs')
const client = new CommandHandler()

//client.loadCommands('./commands')
client.loadScripts('./miscbotskuu/scripts')

client.login(process.env.plant)
