const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/socket/getChunk/:x/:y')

site.get = async (req, res) => {
  try {
    let chunk = await pg.one(`SELECT chunk FROM socket_chunks where x = $(x) and y = $(y) limit 1`, {
      x: Number(req.params.x),
      y: Number(req.params.y),
    })
    res.json(chunk)
  } catch (err) {
    res.json({ error: 'no chunk found' })
  }
}

module.exports = site
