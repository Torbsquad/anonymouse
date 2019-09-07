const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/socket/getChunk/:x/:y')

site.get = async (req, res) => {
  let chunk = await pg.any(`
    SELECT chunk FROM socket_chunks where x = $(x) and y = $(y)
  `,
  {
    x: Number(req.params.x), 
    y: Number(req.params.y)
  })
  res.json(chunk)
}

module.exports = site
