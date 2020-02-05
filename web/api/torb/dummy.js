const nazrin = require('../../../nazrin')
const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/torb/dummy/:data')

site.get = async (req, res) => {
  res.json(req.params.data)
}

module.exports = site
