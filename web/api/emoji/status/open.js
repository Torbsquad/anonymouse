const pg = require('../../../../db')

const { Site } = require('vnft-tools')
const open = new Site('/emoji/status/open')

open.get = async (req, res) => {
  res.json(await pg.any('SELECT * FROM EMOJI_CRAWL WHERE last_fetch < now()'))
}

module.exports = open
