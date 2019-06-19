const { Command } = require('vnftjs')

const activity = new Command()
activity.name = 'setActivity'
activity.addAlias('activity')

activity.funct = (bot, message, args) => {
  bot.user.setActivity(args)
}

activity.addUserWhitelist(u => u.id == '397063436049186818')

module.exports = activity
