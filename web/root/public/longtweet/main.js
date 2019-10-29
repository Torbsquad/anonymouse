var input = document.getElementById('input')
var outputText = document.getElementById('outputText')
var outputImage = document.getElementById('outputImage')
var textBlock = document.getElementById('textBlock')
var imageBlock = document.getElementById('imageBlock')

async function updateText() {
  show(textBlock)
  hide(imageBlock)

  outputText.innerHTML = input.value
    .replace(/\[o\]/g, '<span class="marked">')
    .replace(/\[\/o\]/g, '</span>')
    .replace(/\n/g, '</br>')

  var canvas = await html2canvas(outputText)
  outputImage.innerHTML = ''
  outputImage.appendChild(canvas)

  hide(textBlock)
  show(imageBlock)
}

function hide(el) {
  el.style.display = 'none'
}
function show(el) {
  el.style.display = ''
}

updateText()
