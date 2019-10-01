class Field {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.data = new Array(this.height).fill(0).map(e => new Array(this.width).fill(0))
  }

  toTable() {
    var f = new Array(this.height).fill(0).map(e => new Array(this.width).fill(this.getInputCell().outerHTML))
    return this.getTableFromArray(f)
  }

  toPre() {
    var pre = document.createElement('pre')
    pre.innerHTML = JSON.stringify(this.data, null, 2)
    return pre
  }

  getInputCell() {
    var format = [[0, 1, 0], [1, 0, 1], [0, 1, 0]]
    return this.getTableFromArray(format.map(a => a.map(b => (b ? "<input type='button'/>" : ''))))
  }

  getTableFromArray(array) {
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
}
