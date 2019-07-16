const { Command } = require('vnftjs')
const analyse = require('../../js/emojiAnalysis')

const command = new Command()
command.name = 'analyse'
command.funct = async (bot, message, args) => {
  let analysis = await analyse(args)
  if (analysis) {
    message.channel.send('`' + JSON.stringify(analysis) + '`')
  } else {
    message.channel.send('i dont get any results on that')
  }
}

module.exports = command
