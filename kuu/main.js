const { CommandHandler } = require('vnftjs')
const client = new CommandHandler()

//client.loadCommands('./commands')
client.loadScripts('./kuu/scripts')

client.login(process.env.plant)
