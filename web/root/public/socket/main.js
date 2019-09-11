var socket = io('https://sakurai-discord.herokuapp.com/')
var canvas = document.getElementById('game')
var cx = canvas.getContext('2d')

var players = {}
var objects = []

var grid = [[]]

var client = new Player()
var world = new Block()
var camera = new Camera()
var chunks = {}

var tilesets = [new Tileset('img/armm1998/Overworld.png')]

var idToTile = [[0, 0, 0, 0], [0, 3 * 16, 6 * 16, 0], [0, 2 * 16, 30 * 16, 0], [0, 3 * 16, 32 * 16, 1]]
axios.get(`https://api.vnft.cc/socket/getIdToTileTable`).then(data => {
  idToTile = data.data
})

chunks['0,0'] = new Chunk(0, 0)
chunks['1,0'] = new Chunk(1, 0)
chunks['0,1'] = new Chunk(0, 1)
chunks['1,1'] = new Chunk(1, 1)

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
  initInputs()
  canvas.fullscreen()

  socket.on('data', data => {
    let type = data.data.type
    let id = data.id
    let content = data.data.data

    if (type == 'positionUpdate') {
      if (!players[id]) players[id] = content
      players[id].data = content
      players[id].lastTick = new Date()
    } else if (type == 'tileUpdate') {
      let chunkName = `${content.cx},${content.cy}`
      if (chunks[chunkName]) {
        chunks[chunkName].grid[content.ty][content.tx] = content.value
      }
    }
  })

  window.requestAnimationFrame(loop)
  setInterval(() => {
    socket.emit('data', {
      type: 'positionUpdate',
      data: client.toData(),
    })
  }, 1000 / 20)
}

function loop() {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  window.requestAnimationFrame(loop)

  camera.slideTowards(client.x + client.width / 2, client.y + client.height / 2, 10)
  client.logic(cx)

  var tpX = Math.floor(canvas.width / 2 - camera.x)
  var tpY = Math.floor(canvas.height / 2 - camera.y)
  for (let i in chunks) {
    chunks[i].render(cx, tpX, tpY)
  }

  let mt = {
    x: Math.floor((pointer.x - tpX) / 32),
    y: Math.floor((pointer.y - tpY) / 32),
  }

  cx.fillStyle = 'rgba(0,0,0,.5)'
  cx.fillRect(mt.x * 32 + tpX, mt.y * 32 + tpY, 32, 32)

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

function updateTile(cx, cy, tx, ty, value) {
  let chunkName = `${cx},${cy}`
  if (chunks[chunkName]) {
    chunks[chunkName].grid[ty][tx] = value
  }
  socket.emit('data', {
    type: 'tileUpdate',
    data: { cx, cy, tx, ty, value },
  })
  axios.get(`https://api.vnft.cc/socket/setTile/${cx}/${cy}/${tx}/${ty}/${value}`)
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
