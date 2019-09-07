const pg = require('../../../db')

const { Site } = require('vnft-tools')
const count = new Site('/socket/getChunks')

count.get = async (req, res) => {
  let query = await pg.any('SELECT * FROM socket_chunks')
  res.json(query)
}

module.exports = count
