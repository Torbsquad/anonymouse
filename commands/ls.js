const ls = require('lodestonejs')
const toFetch = ["id", "title", "world", "race", "gender", "clan"]

module.exports = async function(bot, message, args){
  var char = await getlstatus(toFetch, args)
  message.channel.send(char)
}

async function getlstatus(toFetch, uid){
  let char = await als(uid)
  return toFetch.map(f=>`${f}: ${char[f]}`).join('\n')
}

function als(args){
  return new Promise((resolve, reject) => {
    ls(args, (err,data)=>resolve(data))
  })
}
