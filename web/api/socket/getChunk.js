const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/socket/getChunk/:x/:y')

site.get = async (req, res) => {
  let chunk = await pg.one(`
    SELECT chunk FROM socket_chunks where x = $(x) and y = $(y) limit 1
  `,
  {
    x: Number(req.params.x), 
    y: Number(req.params.y)
  })
  res.json(chunk)
}

module.exports = site
