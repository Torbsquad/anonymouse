const pg = require('../../../db')
const { Site } = require('vnft-tools')
const T = require('./client')
const axios = require('axios')

const site = new Site('/twitter/followers')

function getFollowers(cursor = -1) {
  return new Promise(function(res, rej) {
    T.get('followers/list', { cursor, count: 200 }, function(err, data, response) {
      res(data)
    })
  })
}

async function getAllFollowers() {
  let followers = []
  let pointer = await getFollowers(-1)

  do {
    console.log(pointer)
    followers = followers.concat(pointer.users)
    pointer = await getFollowers(pointer.next_cursor)
  } while (pointer.next_cursor != 0 && !pointer.errors)

  return followers
}

site.get = async (req, res) => {
  var allFollowers = await getAllFollowers()

  let query = `
    insert into twitter_followers
      (target_id, follower_id, followers, following, pic_url, name, screen_name, picture)
      values
      ('0', $(id),$(followers),$(following),$(profilepic),$(name), $(screen_name), $(picture))
      on conflict (target_id, follower_id) do nothing
  `

  let followerArray = []
  for (let user of allFollowers) {
    let picture = await axios.get(user.profile_image_url_https, { responseType: 'arraybuffer' })
    let follower = {
      created_at: user.created_at,
      name: user.name,
      id: user.id_str,
      description: user.description,
      followers: user.followers_count,
      following: user.friends_count,
      profilepic: user.profile_image_url_https,
      screen_name: user.screen_name,
      picture: picture.data
    }
    followerArray.push(follower)
    await pg.query(query, follower)
  }

  res.json(followerArray)
}

module.exports = site
