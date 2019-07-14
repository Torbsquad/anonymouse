const pg = require('../../../db')

const { Site } = require('vnft-tools')
const count = new Site('/emoji/count')

count.get = async (req, res) => {
  res.json(await pg.any('SELECT COUNT(*) FROM EMOJIS'))
}

module.exports = count
