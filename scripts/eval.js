const { Script } = require("vnft-commandhandler");

const eva = new Script();

eva.funct = b => {
  bot = b;
  b.on("message", m => {
    try {
      message = m;
      bot = b;
      message.content
        .split("```")
        .filter(el => el.startsWith("js\n"))
        .forEach(el => evalorino(el.substr(3)));
    } catch (err) {
      message.reply(err.message);
    }
  });
};

function evalorino(el) {
  var schleep = "var sleep = time=>new Promise((res,rej)=>{setTimeout(function(){res()},time*1000)})\n";
  if (el.includes("//sync")) {
    eval(schleep + el);
  } else {
    eval(schleep + `async function main(){try{${el}}catch(err){message.reply(err.message)}}main()`);
  }
}

module.exports = eva;
