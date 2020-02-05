const nazrin = require('../../../nazrin')
const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/torb/getUsers')

site.get = async (req, res) => {
  var torb = nazrin.guilds.find(guild => guild.id == "209673980200615939")
  var members = torb.members
  var memberStatus = members.map(member => [member.user.username, member.user.presence.status])
  res.json(memberStatus)
}

module.exports = site
