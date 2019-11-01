const nazrin = require('./nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/coffee')

site.get = async (req, res) => {
  let targetGuild = nazrin.guilds.find(g => g.id == '254735952969334801')

  let members = targetGuild.members.map(member => member.user.username)

  let channels = targetGuild.channels.filter(c => c.type == 'text')
  let rights = channels.map(channel => {
    return {
      name: channel.name,
      members: channel.members.map(member => member.user.username),
    }
  })

  res.json({ members, rights })
}

module.exports = site

/*```js
let permissions = message.channel.permissionsFor(message.member)
let re = permissions.has("VIEW_CHANNEL")
message.reply(re)
```*/
