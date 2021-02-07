const pg = require('../../../db')

const { Site } = require('vnft-tools')
const all = new Site('/emoji/lead/:page')

all.get = async (req, res) => {
  let query = `SELECT * FROM EMOJIS2 ORDER BY POINTS DESC OFFSET $1 LIMIT $2`
  let values = [Number(req.params.page) * 100, 100]
  let re = await pg.query(query, options)
  console.log(re)
  res.json(re)
}

module.exports = all
