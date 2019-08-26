const nazrin = require('../../../nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/coffee')

site.get = async (req, res) => {
  let targetGuild = nazrin.guilds.find( g => g.id == '254735952969334801' )
  let members = targetGuild.members
  let channels = targetGuild.channels.filter( c => c.type == 'text' )
  
  let response = channels.map( channel => {
    return {
      name: channel.name,
      userViewRights: channel.members.map( member => {
        return {
          name: member.user.username,
          canView: channel.permissionsFor(member).has("VIEW_CHANNEL") 
        }
      )
    }
  })
  
  res.json(response)
}

module.exports = site

/*```js
let permissions = message.channel.permissionsFor(message.member)
let re = permissions.has("VIEW_CHANNEL")
message.reply(re)
```*/
