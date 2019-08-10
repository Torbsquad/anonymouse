const nazrin = require('../../../nazrin')
const analyse = require('../../../js/emojiAnalysis')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/serverEmojis/:id')

site.get = async (req, res) => {
  try {
    let server = nazrin.guilds.find(g => g.id == req.params.id)
    let emojis = server.emojis.map(e => {
      return {
        animated: e.animated,
        id: e.id,
        name: e.name,
        url: e.url,
      }
    })
    res.json(emojis)
  } catch (err) {
    res.json(err)
  }
}

module.exports = site
