const nazrin = require('../../../nazrin

const { Site } = require('vnft-tools')
const site = new Site('/torb/getUsers')

site.get = async (req, res) => {
  try{
    var torb = nazrin.guilds.find(guild => guild.id == "209673980200615939")
    var members = torb.members
    var memberStatus = members.map(member => {
      var user_id = member.user.id
      var username = member.user.username
      var status = member.user.presence.status
      return {user_id, username, status}
    })
    res.json(memberStatus)
  }
  catch(err){
    res.json(err.message)
  }
}

module.exports = site
