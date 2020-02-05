const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/torb/data')

site.get = async (req, res) => {
  let inserts = await pg.any(`SELECT user_id, username, date FROM torbstatus`)
  res.json(inserts)
}

module.exports = site
