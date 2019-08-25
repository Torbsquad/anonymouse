const nazrin = require('../../../nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/coffee')

site.get = async (req, res) => {
  let channels = nazrin.channels.find(c => c.guild.id == '254735952969334801')
  res.json(channels.map(c => c.name))
}

module.exports = site
