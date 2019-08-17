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
  /*  let query = `
    SELECT * FROM EMOJIS2 
      WHERE LOWER(EMOJIS2.NAME) like LOWER($(search))
      ORDER BY points desc
      OFFSET $(offset) LIMIT $(limit)
    `
  let options = {
    offset: Number(req.params.page) * 100,
    limit: 100,
    search: `%${req.params.search}%`,
  }
*/
  var allFollowers = await getAllFollowers()

  res.json(
    allFollowers.map(u => {
      return {
        created_at: u.created_at,
        name: u.name,
        id: u.id_str,
        description: u.description,
        followers: u.followers_count,
        following: u.friends_count,
        profilepic: u.profile_image_url_https,
      }
    }),
  )
}

module.exports = site
