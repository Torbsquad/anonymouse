const { Command } = require('vnftjs')
const { get } = require('axios')

const curl = new Command()
curl.name = 'curl'
curl.funct = async function(bot, message, url) {
  if (!url.startsWith('http')) {
    url = 'http://' + url
  }
  const curlSite = await get(url)
  message.channel.send(curlSite.data)
}

module.exports = curl
