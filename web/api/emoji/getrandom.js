const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/emoji/random')

site.get = async (req, res) => {
  let coinflip = Math.round(Math.random())
  let result = false
  
  if (coinflip) {
    // wip get random unlisted
    // if no queryresult, result = false
  }
  
  if (!result) {
    // wip get random listed or unlisted
    res.json({status:"dbd"})
  }
  
  /*
    let offsetQuery = 'select count(*) from emojis2'
    let offsetResult = await pg.one(offsetQuery)
    let offset = offsetResult.count

    let mainQuery = 'select * from emojis2 offset $(offset) limit $(limit)'
    let mainOptions = {
      offset: offset - Number(req.params.page) * 100 - 100,
      limit: 100,
    }
    let mainResult = await pg.any(mainQuery, mainOptions)

    res.json(mainResult.reverse())
  */
}

module.exports = site
