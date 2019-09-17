var inputs = {}
var pointer = { x: 0, y: 0, pressed: false }
function isPressed(key) {
  return inputs[key] == true
}

function initInputs() {
  document.addEventListener('keydown', event => {
    inputs[event.key] = true
  })

  document.addEventListener('keyup', event => {
    inputs[event.key] = false
  })

  canvas.addEventListener('mousemove', event => {
    pointer.x = event.layerX
    pointer.y = event.layerY
  })

  canvas.addEventListener('mousedown', event => {
    pointer.pressed = true
    if (event.button == 2) {
      event.preventDefault()
      return false
    }
  })

  canvas.addEventListener('mouseup', event => {
    pointer.pressed = false
  })
}
