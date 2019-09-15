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
var gamepointer = new Tileset('./img/pointer.png')

var tilesets = [new Tileset('img/armm1998/Overworld.png')]

var idToTile = [[0, 3 * 16, 7 * 16, 0], [0, 0, 0, 0], [0, 2 * 16, 30 * 16, 0], [0, 3 * 16, 32 * 16, 1]]
axios.get(`https://api.vnft.cc/socket/getIdToTileTable`).then(data => {
  idToTile = data.data
})

chunks['0,0'] = new Chunk(0, 0)

canvas.fullscreen = function() {
  let wH = window.innerHeight
  let wW = window.innerWidth

  wH = wH < 720 ? wH : 720
  wW = wW < 1280 ? wW : 1280

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

function loop(e) {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  window.requestAnimationFrame(loop)

  camera.slideTowards(client.x + client.width / 2, client.y + client.height / 2, 10)
  client.logic(cx)

  var tpX = Math.floor(canvas.width / 2 - camera.x)
  var tpY = Math.floor(canvas.height / 2 - camera.y)

  let mt = {
    x: Math.floor((pointer.x - tpX) / 32),
    y: Math.floor((pointer.y - tpY) / 32),
  }

  if (pointer.pressed) {
    if (posToTileId(mt.x, mt.y) != 1) {
      updateTileByPos(mt.x, mt.y, 1)
    }
  }

  let playerChunkX = Math.floor(client.x / 512)
  let playerChunkY = Math.floor(client.y / 512)
  for (let y = -1; y <= 1; y++) {
    let chy = playerChunkY + y
    for (let x = -2; x <= 2; x++) {
      let chx = playerChunkX + x
      let cn = chx + ',' + chy
      if (!chunks[cn]) {
        chunks[cn] = new Chunk(chx, chy)
      } else {
        chunks[cn].render(cx, tpX, tpY)
      }
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

  if (gamepointer.loaded) {
    let t = Math.sin(e / 250) * 2 + 5
    cx.fillStyle = 'rgba(0,0,0,.5)'
    cx.drawImage(gamepointer.image, mt.x * 32 + tpX - t, mt.y * 32 + tpY - t, 32 + t * 2, 32 + t * 2)
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

function updateTileByPos(x, y, value) {
  let cx = Math.floor(x / 16)
  let cy = Math.floor(y / 16)
  let tx = x - cx * 16
  let ty = y - cy * 16
  updateTile(cx, cy, tx, ty, value)
}

function posToTileId(x, y) {
  let cx = Math.floor(x / 16)
  let cy = Math.floor(y / 16)
  let tx = x - cx * 16
  let ty = y - cy * 16
  let chunk = chunks[cx + ',' + cy]
  if (chunk && chunk.grid) {
    return chunk.grid[ty][tx]
  }
  return true
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
