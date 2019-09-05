var socket = io('https://sakurai-discord.herokuapp.com/')
var canvas = document.getElementById('game')
var cx = canvas.getContext('2d')

var players = {}
var objects = []

var grid = new Array(30)
  .fill(0)
  .map(e => new Array(30).fill(0).map(f => [Math.round(18 + Math.random()), Math.round(8 + Math.random())]))

var client = new Player()
var world = new Block()
var camera = new Camera()
var mainTileset = new Tileset('img/tilesets/tileset_waterworld.png')
var overworldTileset = new Tileset('img/tilesets/tiles.png')

canvas.fullscreen = function() {
  let wH = window.innerHeight
  let wW = window.innerWidth

  wH = wH < 1104 ? wH : 1104
  wW = wW < 1936 ? wW : 1936

  canvas.width = wW
  canvas.height = wH

  canvas.style.width = wW
  canvas.style.height = wH
}
canvas.fullscreen()

function main() {
  canvas.fullscreen()

  socket.on('data', data => {
    if (!players[data.id]) players[data.id] = data.data
    players[data.id].data = data.data
    players[data.id].lastTick = new Date()
  })

  window.requestAnimationFrame(loop)
  setInterval(() => {
    socket.emit('data', client.toData())
  }, 1000 / 20)
}

function loop() {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  window.requestAnimationFrame(loop)

  camera.slideTowards(client.x + client.width / 2, client.y + client.height / 2, 10)
  client.logic(cx)

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      cx.drawImage(
        overworldTileset.image,
        16 * grid[y][x][0], 16 * grid[y][x][1],
        16, 16,
        Math.round(x * 32 + canvas.width / 2 - camera.x),
        Math.round(y * 32 + canvas.height / 2 - camera.y),
        32, 32,
      )
    }
  }

  for (let id in players) {
    for (let attr in players[id].data) {
      if (attr == 'x' || attr == 'y') {
        players[id][attr] += (players[id].data[attr] - players[id][attr]) / 3
      } else {
        players[id][attr] = players[id].data[attr]
      }
    }
  }

  for (let id in objects) {
    let obj = objects[id]
    GameObject.draw_(cx, obj, canvas, camera)
  }
  for (let id in players) {
    let p = players[id]
    if (new Date() - p.lastTick < 10000) {
      if (p.animFrame != 0) {
        cx.fillStyle = 'red'
      }
      GameObject.draw_(cx, p, canvas, camera)
      cx.fillStyle = 'black'
    }
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
