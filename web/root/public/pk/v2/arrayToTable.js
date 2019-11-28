function arrayToTable(table, array, refresh = false) {
  if (refresh) {
    table.innerHTML = ''
  }
  for (let row of array) {
    var tr = document.createElement('tr')
    for (let cell of row) {
      var td = document.createElement('td')

      let c = String(cell)
      let regImage = new RegExp('Type:(.*)')
      let regEffect = new RegExp('Effect:(.*)')

      if (c.match(regImage)) {
        let result = c.match(regImage)
        let img = document.createElement('img')
        img.className = 'type'
        img.src = result[1]
        td.appendChild(img)
      } else if (c.match(regEffect)) {
        let result = c.match(regEffect)
        td.innerHTML = result[1]
        let d = ['0', '0.25', '0.5', '1', '2', '4']
        td.className = `effect${d.indexOf(result[1])}`
      } else {
        td.innerHTML = cell
      }

      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
}
