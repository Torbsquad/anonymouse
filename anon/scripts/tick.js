const { Script } = require('vnftjs')
const { sleep } = require('vnft-tools')

const script = new Script()

function tick(bot) {
  let activity =  currentTime()+" - "+getTimeUntil(14)
  bot.user.setActivity(activity)
}

function currentTime(){
  let time = new Date().toString().split(" ")[4]
  time = activity.split(":")
  time.shift()
  time = time.join(":")
  return time
}

function doubleDigits(number){
  number = (number).toString()
  while(number.length < 2) number = "0" + number
  return number
}

function getTimeUntil(hh,mm=0){
  let d = new Date()
  let e = new Date()
  e.setHours(hh)
  e.setMinutes(mm)
  e.setSeconds(0)
  let f = new Date(e-d)
  return doubleDigits(f.getHours())+":"+doubleDigits(f.getMinutes())
}

script.funct = async bot => {
  await sleep(10000)
  setInterval(function() {
    tick(bot)
  }, 30000)
}

module.exports = script
