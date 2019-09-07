const pg = require('../../../db')

const { Site } = require('vnft-tools')
const count = new Site('/socket/setTile/:cx/:cy/:x/:y/:tile')

count.get = async (req, res) => {
  let query = await pg.query(`
    UPDATE socket_chunks SET chunk[$(y)][$(x)] = $(tile)
      WHERE x = $(cx) and y = $(cy)
    `,{
      x: Number(req.params.x),
      y: Number(req.params.y),
      cx: Number(req.params.cx),
      cy: Number(req.params.cy),
      tile: Number(req.params.tile)
    })
  
  res.json({status:"ok"})
}

module.exports = count
