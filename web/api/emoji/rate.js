const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/emoji/rate/:hash/:score/:tag')

site.get = async (req, res) => {
  // get data
  // if not exist: create
  // else: make score-average and set tag to new
  res.json({status:'tbd'})
}

module.exports = site
