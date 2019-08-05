const { CommandHandler } = require('vnftjs')
const client = new CommandHandler()
client.loadScripts('./nuu/scripts')
client.login(process.env.plant)
