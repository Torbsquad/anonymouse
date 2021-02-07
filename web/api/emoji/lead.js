const pg = require('../../../db')

const { Site } = require('vnft-tools')
const all = new Site('/emoji/lead/:page')

all.get = async (req, res) => {
  console.log("LEAD 1")
  let query = `SELECT * FROM EMOJIS2 ORDER BY POINTS DESC OFFSET $(offset) LIMIT $(limit)`
  console.log("LEAD 2")
  let options = {
    offset: Number(req.params.page) * 100,
    limit: 100,
  }

  console.log("LEAD 3")
  res.json(await pg.any(query, options).catch(e=>console.log(e)))
}

module.exports = all
