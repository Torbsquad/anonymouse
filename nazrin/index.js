const { CommandHandler } = require('vnftjs')
const bot = new CommandHandler()
const path = require('path')

bot.loadCommands(path.join(__dirname, 'commands'))
//bot.loadScripts(path.join(__dirname, 'scripts'))

bot.login(process.env.nazrin)
