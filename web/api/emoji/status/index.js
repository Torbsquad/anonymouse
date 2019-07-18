const pg = require('../../../../db')

const { Site } = require('vnft-tools')
const status = new Site('/emoji/status')

status.get = async (req, res) => {
  res.json(await pg.any('SELECT * FROM EMOJI_CRAWL'))
}

module.exports = status
