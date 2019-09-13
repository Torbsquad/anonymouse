var canvas = document.getElementById('canvas')
var cx = canvas.getContext('2d')

function main() {
  cx.fillRect(0, 0, 100, 100)
}

window.addEventListener('resize', event => {
  canvas.height = window.innerHeight - 1
  canvas.width = window.innerWidth - 1
})
