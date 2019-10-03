class Cursor {
    constructor(canvas) {
        this.mode = "select"
        this.canvas = canvas
        this.canvas.addEventListener("click", () => this.onclick(this) )
    }
    onclick(el) {
        if(el.mode == "select"){
            console.log(5)
        }
        console.log(1+1)
    }
}