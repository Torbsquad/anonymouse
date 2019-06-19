const { Command } = require('vnftjs')
const analyse = require('../../js/emojiAnalysis')

const analyseEmoji = new Command()
analyseEmoji.name = 'analyse'
analyseEmoji.funct = async (bot, message, args) => {
  let analysis = await analyse(args)
  if (analysis) {
    message.channel.send('`' + JSON.stringify(analysis) + '`')
  } else {
    message.channel.send('i dont get any results on that')
  }
}

module.exports = analyseEmoji
