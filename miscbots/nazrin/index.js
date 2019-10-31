const { CommandHandler } = require('vnftjs')
const bot = new CommandHandler()
const path = require('path')

bot.prefix = '_'
bot.loadCommands(path.join(__dirname, 'commands'))
bot.loadScripts(path.join(__dirname, 'scripts'))

bot.login(process.env.nazrin)

module.exports = bot
