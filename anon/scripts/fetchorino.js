const { Script } = require('vnftjs')
const pg = require('../../db')
const axios = require('axios')

const fetchorino = new Script()
fetchorino.interval = 25000

async function fetchMessages(channel_id, message_id) {
  let channel = bot.channels.find(c => c.id === channel_id)
  let messages = await channel.fetchMessages({ after: message_id, limit: 100 })
  pg.query(`
    UPDATE EMOJI_CRAWL SET 
      LAST_MESSAGE_ID = $(lastMessage),
      LAST_FETCH = NOW()
      WHERE CHANNEL_ID = $(channelId)
    `,
    {
      lastMessage: messages.first().id,
      channelId: channel_id
    }
  )
  return messages
}

async function readMessage(message) {
  if (message.content) {
    let emojis = message.content.match(/<(a|):.*?:.*?>/g)
    for (let emoji of emojis) {
      await axios.get(`https://api.vnft.cc/emoji/add/${emoji}`)
    }
  }
}

fetchorino.funct = async bot => {
  const ergebnis = await pg.one(`
    SELECT * FROM EMOJI_CRAWL 
      ORDER BY last_fetch asc 
      LIMIT 1
  `)

  let messages = await fetchMessages(ergebnis.channel_id, ergebnis.last_message_id)
  for (let message of messages) {
    await readMessage(message)
  }
}

module.exports = fetchorino
