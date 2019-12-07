const PokeWiki = require('./PokeWiki')

const { Site } = require('vnft-tools')
const site = new Site('/pk/:pokemon')

site.get = async (req, res) => {
  let p = new PokeWiki(req.params.pokemon)
  await p.load()
  res.json(p.stats)
}

module.exports = site
