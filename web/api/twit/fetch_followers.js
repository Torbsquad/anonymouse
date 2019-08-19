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
      (target_id, follower_id, followers, following, pic_url, name, screen_name, picture, still_following)
      values
      ('0', $(id),$(followers),$(following),$(profilepic),$(name), $(screen_name), $(picture),'t')
      on conflict (target_id, follower_id) 
        do update 
          set followers=$(followers),
              following=$(following),
              pic_url=$(profilepic),
              name=$(name),
              screen_name=$(screen_name),
              picture=$(picture)
              still_following = 't'
          where 
              target_id = '0' and 
              follower_id = $(id)
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
      picture: picture.data,
    }
    followerArray.push(follower)
    await pg.query(query, follower)
  }

  let stillFollowing = followerArray.map(f=>f.id)
  await pg.query(`
    update twitter_followers 
    set still_following = 'f'
    where follower_id != ALL('{${stillFollowing.join(',')}}'::text[])
  `,stillFollowing)
  
  res.json(followerArray)
}

module.exports = site
