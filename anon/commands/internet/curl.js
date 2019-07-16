const { Command } = require('vnftjs')
const { get } = require('axios')

const command = new Command()
command.name = 'curl'
command.funct = async function(bot, message, url) {
  if (!url.startsWith('http')) {
    url = 'http://' + url
  }
  const curlSite = await get(url)
  message.channel.send(curlSite.data)
}

module.exports = command
