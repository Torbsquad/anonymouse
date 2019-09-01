const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/emoji/random')

site.get = async (req, res) => {
  let coinflip = Math.round(Math.random())
  let result = false

  if (coinflip) {
    let unlistedQuery = `
      select *, emojis2.hash from emojis2
      left join emoji_rating on emojis2.hash = emoji_rating.hash
      where emoji_rating.hash is null and random() < 0.001
      limit 1
    `

    try {
      result = await pg.one(unlistedQuery)
      res.json({
        type: 'unlisted',
        result: result,
      })
    } catch (err) {
      result = false
    }
  }

  if (!result) {
    let listedQuery = `
      select *, emojis2.hash from emojis2
      left join emoji_rating on emojis2.hash = emoji_rating.hash
      where random() < 0.001 
      limit 1
    `

    try {
      result = await pg.one(listedQuery)
      res.json({
        type: 'listed or unlisted',
        result: result,
      })
    } catch (err) {
      result = false
      res.json({
        type: 'listed or unlisted',
        result: result,
      })
    }
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
