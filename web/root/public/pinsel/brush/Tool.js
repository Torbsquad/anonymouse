class Tool {
    constructor(leinwand){
        this.leinwand = leinwand
        this.element = document.createElement("button")
        this.element.style.width = "50px"
        this.element.style.height = "50px"
        this._name = "null"

        this.element.addEventListener("click", () => this.onclick(this))
    }
    onclick(el){
        el.leinwand.mode = this.name
    }
    set name(value) {
        this.element.innerHTML = value
        this._name = value
    }
    get name() {
        return this._name
    }
}
