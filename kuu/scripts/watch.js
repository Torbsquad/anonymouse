const { Script } = require('vnftjs')
const pg = require('../../db')
const axios = require('axios')

let fetchStrike = new Script()
fetchStrike.interval = 10000
let client

async function getChannelPointer(channelid) {
  try {
    let queryResult = await pg.one(
      `
        select last_message_id from emoji_crawl 
        where channel_id=$(channel) limit 1
      `,
      { channel: channelid },
    )
    return queryResult['last_message_id']
  } catch (err) {
    return '0'
  }
}

async function setChannelPointer(channelid, messageid, options = {}) {
  let query = `
      UPDATE emoji_crawl SET 
        last_message_id = $(message), 
        last_fetch = NOW() ${options.fetchExtension || ''}
        WHERE channel_id = $(channel);
      INSERT INTO emoji_crawl (channel_id, last_message_id)
        SELECT $(channel), $(message)
        WHERE NOT EXISTS (
          SELECT 1 FROM emoji_crawl WHERE channel_id=$(channel)
        );
    `
  let queryOptions = {
    channel: channelid,
    message: messageid,
  }
  await pg.query(query, queryOptions)
}

async function tick(channelId) {
  let channel = client.channels.find(c => c.id == channelId)
  let channelPointer = await getChannelPointer(channelId)
  let messages = await channel.fetchMessages({ after: channelPointer })
  if (messages.size == 0) {
    setChannelPointer(channelId, channelPointer, {
      fetchExtension: " + interval '1 day'",
    })
    return false
  }
  channelPointer = messages.first().id
  setChannelPointer(channelId, channelPointer)

  for (let message of messages) {
    if (message.content) {
      let emojis = message.content.match(/<(a|):.*?:.*?>/g)
      if (!emojis) {
        break
      }
      if (!Array.isArray(emojis)) {
        emojis = [emojis]
      }
      for (let emoji of emojis) {
        console.log('found:', emoji)
        axios.get(`https://api.vnft.cc/emoji/add/${emoji}`)
      }
    }
  }
}

fetchStrike.funct = async b => {
  client = b
  let target = await pg.one(`
    select channel_id from emoji_crawl order by last_fetch asc limit 1
  `)
  tick(target['channel_id'])
}

//module.exports = fetchStrike