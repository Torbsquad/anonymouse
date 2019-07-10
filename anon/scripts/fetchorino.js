const { Script } = require('vnftjs')
const pg = require('../../db')
const axios = require('axios')

const fetchorino = new Script()
fetchorino.interval = 25000

fetchorino.funct = async bot => {
  const ergebnis = await pg.one(`
    SELECT * FROM EMOJI_CRAWL 
      ORDER BY last_fetch asc 
      LIMIT 1
  `)

  let channel = bot.channels.find(c => c.id == ergebnis.channel_id)
  let messages = await channel.fetchMessages({
    after: ergebnis.last_message_id,
    limit: 100
  })

  if (messages.size) {
    await pg.query(
      `
      UPDATE EMOJI_CRAWL SET 
        LAST_MESSAGE_ID = $(lastMessage),
        LAST_FETCH = NOW()
        WHERE CHANNEL_ID = $(channelId)
      `,
      {
        lastMessage: messages.first().id,
        channelId: ergebnis.channel_id
      }
    )
    for (let message of messages.array()) {
      console.log(message.content)
      if (message.content) {
        let emojis = message.content.match(/<(a|):.*?:.*?>/g)
        if(!Array.isArray(emojis)){
          emojis = [emojis]
        }
        for (let emoji of emojis) {
          await axios.get(`https://api.vnft.cc/emoji/add/${emoji}`)
        }
      }
    }
  }

}

module.exports = fetchorino
