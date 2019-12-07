const { Site } = require('vnft-tools')
const site = new Site('/pk/:pokemon')

site.get = async (req, res) => {
  res.json(req.params.page)
}

module.exports = site
