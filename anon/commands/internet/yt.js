const { Command } = require('vnftjs')
const get = require('axios')

const command = new Command()
command.name = 'yt'
command.addAlias('youtube')

command.funct = async (bot, message, args) => {
  var search = args
  var url = encodeURI(`https://www.youtube.com/results?search_query=${search}`)
  const youtubeSite = await get(url)
  var youtube_video_id = /"\/watch\?v=(.*?)"/.exec(youtubeSite.data)[1]
  message.reply(`https://www.youtube.com/watch?v=${youtube_video_id}`)
}

module.exports = command
