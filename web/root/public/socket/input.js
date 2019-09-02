var inputs = {}
function isPressed(key) {
  return inputs[key] == true
}

document.addEventListener('keydown', event => {
  inputs[event.key] = true
})

document.addEventListener('keyup', event => {
  inputs[event.key] = false
})
