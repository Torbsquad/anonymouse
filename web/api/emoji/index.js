const pg = require('../../../db')

const { Site } = require('vnft-tools')
const all = new Site('/emoji')

all.get = async (req, res) => {
  res.json(await pg.any('SELECT * FROM EMOJIS2'))
}

module.exports = all
