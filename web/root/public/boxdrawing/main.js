var input = document.getElementById('input')
var output = document.getElementById('output')

function tableFromArray(array) {
  var table = document.createElement('table')
  table.style.border = '1px solid black'
  for (let y = 0; y < array.length; y++) {
    var tr = document.createElement('tr')
    for (let x = 0; x < array[y].length; x++) {
      var td = document.createElement('td')
      td.innerHTML = array[y][x]
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  return table
}

function inputCell() {
  var format = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
  ]
  return tableFromArray(format.map(a => a.map(b => (b ? "<input type='button'/>" : ''))))
}

function inputField(width, height) {
  var f = new Array(height).fill(0).map(e => new Array(width).fill(inputCell().outerHTML))
  return tableFromArray(f)
}

input.appendChild(inputField(5, 3))
