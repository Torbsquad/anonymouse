const pg = require('../../../db')
const { Site } = require('vnft-tools')

const search = new Site('/twitter/followers2')
search.get = async (req, res) => {
  let query = `
    SELECT * FROM twitter_followers
  `
  res.json(await pg.any(query))
}

module.exports = search
