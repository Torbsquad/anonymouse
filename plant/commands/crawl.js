const { Command } = require('vnftjs')
const { sleep } = require('vnft-tools')

async function getEmojisFromMessages(messages, callbackOnEveryEmoji) {
  let emojis = []
  let firstId = false
  let lastId = false

  if (messages) {
    messages = messages.array()
    for (let message of messages) {
      if (!lastId) {
        lastId = message.id
      }
      firstId = message.id
      if (message.content) {
        let fetch = message.content.match(/<(a|):.*?:.*?>/g)
        if (fetch) {
          let detailed = fetch.map(e => e.match(/<(a|):(.*?):(.*?)>/))
          if (detailed) {
            emojis = emojis.concat(detailed)
            if (callbackOnEveryEmoji) {
              detailed.forEach(callbackOnEveryEmoji)
            }
          }
        }
      }
    }
  }

  return { firstId, lastId, emojis }
}

const crawl = new Command()
crawl.name = 'crawl'

crawl.funct = async (client, message, args) => {
  let ch = bot.channels.find(c => c.id == args)

  if (!ch) {
    message.reply('invalid id')
    return null
  }

  let o = { lastId: '0' }

  while (o.lastId != false) {
    let messages = await ch.fetchMessages({ limit: 100, after: o.lastId })
    o = await getEmojisFromMessages(messages, console.log)
    await sleep(1000)
  }
}

module.exports = crawl
