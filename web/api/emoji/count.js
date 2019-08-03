const pg = require('../../../db')

const { Site } = require('vnft-tools')
const count = new Site('/emoji/count')

count.get = async (req, res) => {
  let query = await pg.one('SELECT COUNT(*) FROM EMOJIS2')
  res.send(query.count)
}

module.exports = count
