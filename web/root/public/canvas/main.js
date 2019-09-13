var canvas = document.getElementById('canvas')
var cx = canvas.getContext('2d')

function main() {
  resizeWindow()
  cx.fillRect(0, 0, 100, 100)
}

function resizeWindow() {
  canvas.height = window.innerHeight - 1
  canvas.width = window.innerWidth - 1
}

window.addEventListener('resize', resizeWindow)

document.addEventListener('mousemove', event => {
  cx.fillRect(event.layerX, event.layerY, 2, 2)
})
