class Leinwand{
    constructor(elementId){
        this.canvas = document.getElementById(elementId)
        this.canvas.width = "500"
        this.canvas.height = "500"
        this.canvas.style.background = "white"

        this.canvas.onclick = function(){
            console.log(1+1)
        }
    }

}