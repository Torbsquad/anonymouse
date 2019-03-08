const ls = require('lodestonejs')

module.exports = async function(bot, message, args){
  var char = await als(args)
  message.reply(char.name)
}

als = (args) => new Promise( (resolve, reject) => {
  ls(args, (err, data)=>resolve(data))
})
