const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/socket/getIdToTileTable')

site.get = async (req, res) => {
  let table = await pg.any('SELECT * FROM idToTable')

  let indexlist = ["tileset","x","y","collision"]
  let response = table.map(d=>indexlist.map(i=>d[i]))
  res.json(response)
}

module.exports = site
