const nazrin = require('../../../nazrin')
const analyse = require('../../../js/emojiAnalysis')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/serverEmojisWithHash/:id')

site.get = async (req, res) => {
  try {
    let server = nazrin.guilds.find(g => g.id == req.params.id)
    let emojis = server.emojis.map(e => e.toString())
    for (i in emojis) {
      emojis[i] = await analyse(emojis[i])
    }
    res.json(emojis)
  } catch (err) {
    res.json(err)
  }
}

module.exports = site
