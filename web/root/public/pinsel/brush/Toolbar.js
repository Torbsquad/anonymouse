class Toolbar {
  constructor(leinwand) {
    this.leinwand = leinwand
    this.element = document.getElementById("toolbar")
    this.mode = 'select'
  }
  addTool(name) {
    let tool = new Tool(this.leinwand)
    tool.name = name
    this.element.appendChild(tool.element)
  }
}
