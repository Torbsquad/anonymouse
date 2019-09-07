const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/socket/getChunks')

site.get = async (req, res) => {
  let query = await pg.any('SELECT * FROM socket_chunks')
  res.json(query)
}

module.exports = site
