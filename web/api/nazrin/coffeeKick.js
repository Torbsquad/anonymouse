// what do we have here xd

const nazrin = require('./nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/coffee/kick/:id')

site.get = async (req, res) => {
  let targetGuild = nazrin.guilds.find(g => g.id == '254735952969334801')
  try {
    let member = targetGuild.members.find(member => member.user.id == req.params.id)
    console.log(member)
    console.log(member.kickable())
    await member.kick()
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ err: err.message })
  }
}

module.exports = site
