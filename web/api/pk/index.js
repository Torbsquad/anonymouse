const { Site } = require('vnft-tools')
const site = new Site('/pk/:pokemon')

site.get = async (req, res) => {
  delete require.cache[require.resolve('./PokeWiki.js')]
  var PokeWiki = require('./PokeWiki')
  let p = new PokeWiki(req.params.pokemon)
  await p.load()
  res.json(p.variants)
}

module.exports = site
