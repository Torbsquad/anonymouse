class Cursor {
    constructor(canvas) {
        this.mode = "select"
        this.canvas = canvas
        this.canvas.addEventListener("click", this.onclick )
    }
    onclick() {
        console.log(1+1)
    }
}