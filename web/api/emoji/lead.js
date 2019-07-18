const pg = require('../../../db')

const { Site } = require('vnft-tools')
const all = new Site('/emoji/lead/:page')

all.get = async (req, res) => {
  let query = `SELECT * FROM EMOJIS ORDER BY POINTS OFFSET $(offset) LIMIT $(limit)`
  let options = {
    offset: Number(req.params.page) * 100,
    limit: 100,
  }

  res.json(await pg.any(query, options))
}

module.exports = all
