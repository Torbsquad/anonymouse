/****************************
 * in loving memory of anon *
 ****************************/

const path = require('path')

const { CommandHandler } = require('vnftjs')
const bot = new CommandHandler()

bot.on('ready', () => {
  console.log("bless anon's soul")
})

bot.admins = typeof process.env.admins != 'undefined' ? process.env.admins.split(',') : []

bot.enableHelp()
bot.helpColor = "CYAN"

bot.loadCommands(path.join(__dirname, 'commands'))
bot.loadScripts(path.join(__dirname, 'scripts'))

bot.login(process.env.anon)

require('../plant/main.js')
