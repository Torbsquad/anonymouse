const { Command } = require('vnftjs')

const status = new Command()
status.name = 'setStatus'

const translations = [
  { status: 'dnd', alias: ['red', 'busy'] },
  { status: 'online', alias: ['green', ''] },
  { status: 'idle', alias: ['yellow', 'away', 'afk'] },
]

status.funct = (bot, message, args) => {
  let translation = translations.find(t => t.alias.includes(args))
  if (translation) {
    args = translation.status
  }
  bot.user.setStatus(args)
}

module.exports = status
