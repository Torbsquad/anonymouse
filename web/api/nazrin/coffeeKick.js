// what do we have here xd

const nazrin = require('../../../nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/coffee/kick/:id')

site.get = async (req, res) => {
  let targetGuild = nazrin.guilds.find(g => g.id == '254735952969334801')

  let member = targetGuild.members.find(member => req.params.id)
  member.kick()

  res.json({ status: ok })
}

module.exports = site
