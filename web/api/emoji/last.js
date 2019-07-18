const pg = require('../../../db')

const { Site } = require('vnft-tools')
const last = new Site('/emoji/last/:page')

last.get = async (req, res) => {
  let offsetQuery = 'select count(*) from emojis'
  let offsetResult = await pg.one(offsetQuery)
  let offset = offsetResult.count
  
  let mainQuery = 'select * from emojis offset $(offset) limit $(limit)'
  let mainOptions = {
    offset: offset - Number(req.params.page) * 100 - 100,
    limit: 100,
  }
  let mainResult = await pg.any(mainQuery, mainOptions)

  res.json(mainResult.reverse())
}

module.exports = last
