const pg = require('../../../db')

const { Site } = require('vnft-tools')
const random = new Site('/emoji/random/:page')

random.get = async (req, res) => {
  let mainQuery = 'select * from emojis2 where random() < 0.001 limit $(limit)'
  let mainOptions = {
    limit: 100,
  }
  let mainResult = await pg.any(mainQuery, mainOptions)

  res.json(mainResult)
}

module.exports = random
