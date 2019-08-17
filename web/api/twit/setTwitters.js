const pg = require('../../../db')
const { Site } = require('vnft-tools')
const T = require('./client')

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
      (target_id, follower_id, followers, following, pic_url, name)
      values
      ('0', $(id),$(followers),$(following),$(profilepic),$(name))
      on conflict (target_id, follower_id) do nothing
  `

  let followerArray = allFollowers.map(u => {
    return {
      created_at: u.created_at,
      name: u.name,
      id: u.id_str,
      description: u.description,
      followers: u.followers_count,
      following: u.friends_count,
      profilepic: u.profile_image_url_https,
    }
  })

  for (let follower of followerArray) {
    await pg.query(query, follower)
  }

  res.json(followerArray)
}

module.exports = site
