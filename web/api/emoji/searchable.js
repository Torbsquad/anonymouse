const pg = require('../../../db')
const { Site } = require('vnft-tools')

const search = new Site('/emoji/search/:search/:page')
search.get = async (req, res) => {
  let query = `SELECT * FROM EMOJIS WHERE name like $(search) OFFSET $(offset) LIMIT $(limit)`
  let options = {
    offset: Number(req.params.page)*100,
    limit: 100,
    search: `%${req.params.search}%`
  }
  res.json(await pg.any(query, options))
}

module.exports = search
