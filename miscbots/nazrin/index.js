const { CommandHandler } = require('vnftjs')
const bot = new CommandHandler()
const path = require('path')

bot.prefix = '_'
bot.loadCommands('./miscbots/nazrin/commands')
bot.loadScripts('./miscbots/nazrin/scripts')

bot.login(process.env.nazrin)

module.exports = bot
