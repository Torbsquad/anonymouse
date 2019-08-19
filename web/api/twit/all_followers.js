const pg = require('../../../db')
const { Site } = require('vnft-tools')

const search = new Site('/twitter/all_followers')
search.get = async (req, res) => {
  let query = `
    SELECT * FROM twitter_followers 
    ORDER BY listed_since ASC
  `
  res.json(await pg.any(query))
}

module.exports = search
