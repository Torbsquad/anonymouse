const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/socket/setTile/:cx/:cy/:tx/:ty/:value')

site.get = async (req, res) => {
  let query = await pg.query(
    `
    UPDATE socket_chunks SET chunk[$(ty)][$(tx)] = $(value)
      WHERE x = $(cx) and y = $(cy)
    `,
    {
      tx: Number(req.params.tx) + 1,
      ty: Number(req.params.ty) + 1,
      cx: Number(req.params.cx),
      cy: Number(req.params.cy),
      value: Number(req.params.value),
    },
  )

  res.json({ status: 'ok' })
}

module.exports = site
