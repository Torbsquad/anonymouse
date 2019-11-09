const { Script } = require('vnftjs')

const eva = new Script()

eva.funct = b => {
  bot = b
  b.on('message', m => {
    try {
      message = m
      bot = b
      message.content
        .split('```')
        .filter(el => el.startsWith('js\n'))
        .forEach(el => evalorino(el.substr(3)))
    } catch (err) {
      message.reply(err.message)
    }
  })
}

function evalorino(el) {
  var schleep = 'var sleep = time=>new Promise((res,rej)=>{setTimeout(function(){res()},time*1000)})\n'
  if (el.includes('//sync')) {
    eval(schleep + el)
  } else if(el.includes('//canvas')){
    eval(schleep + `async function main(){try{
      const canvas = Canvas.createCanvas(500, 300)
      const ctx = canvas.getContext('2d')
      ${el}
      const attachment = new Discord.Attachment(canvas.toBuffer(), evalresult.png)
      message.channel.send(args, attachment)
    }catch(err){
      message.reply(err.message)
    }}main()`)
  } else{
    eval(schleep + `async function main(){try{${el}}catch(err){message.reply(err.message)}}main()`)
  }
}

module.exports = eva
