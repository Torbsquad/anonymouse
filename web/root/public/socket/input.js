var inputs = {}
var pointer = {x:0, y:0}
function isPressed(key) {
  return inputs[key] == true
}

function initInputs(){
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
}
