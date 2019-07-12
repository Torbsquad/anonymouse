const { Command } = require('vnftjs')
const pg = require('../../../db')
const axios = require('axios')
let fetchStrike = new Command()
fetchStrike.name = 'fetch'
let client

async function getChannelPointer(channelid) {
  try {
    let queryResult = await pg.one(`
          select last_message_id from emoji_crawl 
          where channel_id=$(channel) limit 1
        `,
      { channel: channelid }
    )
    return queryResult['last_message_id']
  } catch (err) {
    return '0'
  }
}

async function setChannelPointer(channelid, messageid) {
  let query = `
        UPDATE emoji_crawl SET last_message_id=$(message) WHERE channel_id=$(channel);
        INSERT INTO emoji_crawl (channel_id, last_message_id)
           SELECT $(channel), $(message)
           WHERE NOT EXISTS (SELECT 1 FROM emoji_crawl WHERE channel_id=$(channel));
    `
  let options = {
    channel: channelid,
    message: messageid
  }
  await pg.query(query, options)
}

async function tick(channelId) {
  let channel = client.channels.find(c => c.id == channelId)
  console.log(channel.name)
  let channelPointer = await getChannelPointer(channelId)
  console.log(channelPointer)
  let messages = await channel.fetchMessages({ after: channelPointer })
  console.log(messages.size)
  if (messages.size == 0) {
    return false
  }
  channelPointer = messages.first().id
  setChannelPointer(channelId, channelPointer)
    
  for (let message of messages) {
    console.log(message)
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

fetchStrike.funct = (b, m, a) => {
  client = b
  tick(a)
}

module.exports = fetchStrike
