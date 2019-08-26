const nazrin = require('../../../nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/coffee')

site.get = async (req, res) => {
  let channels = nazrin.channels.filter(c => c.type == 'text' && c.guild.id == '254735952969334801')
  let response = channels.map(channel=>{
    return {
      name: channel.name,
      viewRights: "tbd"
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
