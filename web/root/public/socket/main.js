var socket = io('https://sakurai-discord.herokuapp.com/')
var canvas = document.getElementById('game')
var cx = canvas.getContext('2d')
var players = {}
var objects = []

var client = new Player()
var world = new Block()
var camera = new Camera()

canvas.fullscreen = function() {
  let wH = window.innerHeight
  let wW = window.innerWidth

  if (wH * 16 < wW * 9) {
    canvas.width = (wH * 16) / 9
    canvas.style.width = canvas.width
    canvas.height = wH
    canvas.style.height = canvas.height
  } else {
    canvas.width = wW
    canvas.style.width = canvas.width
    canvas.height = (wW * 9) / 16
    canvas.style.height = canvas.height
  }
}
canvas.fullscreen()

function main() {
  canvas.fullscreen()

  socket.on('data', data => {
    players[data.id] = data.data
  })

  window.requestAnimationFrame(loop)
  setInterval(() => {
    socket.emit('data', client.toData())
  }, 1000 / 30)
}

function loop() {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  window.requestAnimationFrame(loop)

  camera.slideTowards(client.x+client.width/2, client.y+client.height/2, 10)
  client.logic(cx)

  for (let id in objects) {
    let obj = objects[id]
    GameObject.draw_(cx, obj, canvas, camera)
  }
  for (let id in players) {
    let p = players[id]
    GameObject.draw_(cx, p, canvas, camera)
  }
}

// requestAnimationFrame polyfill by Erik Moeller
var lastTime = 0
var vendors = ['webkit', 'moz']
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
  window.cancelAnimationFrame =
    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
}

if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime()
    var timeToCall = Math.max(0, 16 - (currTime - lastTime))
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }

if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id)
  }

window.onresize = canvas.fullscreen
