class Graph{
    constructor(func){
        this.func = func

        this.canvas = document.createElement("canvas")
        this.canvas.style.border = "1px solid grey"
        this.context = this.canvas.getContext("2d")
        document.body.append(this.canvas)

        this.canvas.height = 500
        this.canvas.width = 500

        this.axisStepsizeX = 1
        this.axisStepsizeY = .5

        this.xRange = 4
        this.yRange = 1
    }

    drawAxis(){
        var width = this.canvas.width
        var height = this.canvas.height
        var midX = height/2
        var midY = width/2

        this.context.fillRect(0, midX, width, 1)
        this.context.fillRect(midY, 0, 1, height)

        var stepsizeX = width / this.xRange / 2
        for(var x = -this.xRange; x <= this.xRange; x += this.axisStepsizeX){
            this.context.fillText(x, (x + this.xRange) * stepsizeX - 5, midX + 10)
        }

        var stepsizeY = height / this.yRange / 2
        for(var y = -this.yRange; y <= this.yRange; y += this.axisStepsizeY){
            this.context.fillText(y, midY + 5, (-y + this.yRange) * stepsizeY + 5)
            console.log(y)
        }
    }

    drawFunc(func = this.func) {
        var width = this.canvas.width
        var height = this.canvas.height
        var midX = height/2
        var midY = width/2

        var ctx = this.context
        var stepsizeX = width / this.xRange / 2
        var stepsizeY = height / this.yRange / 2

        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3
    
        for(var i = -1; i < width+1; i++){
            var y = (-func((i - midX) / stepsizeX) * stepsizeY + midY) 
            if( i == -1 ){
                ctx.moveTo(i, y)
                ctx.beginPath()
            }
            ctx.lineTo(i, y)
        }
        ctx.stroke()
    }

    redraw(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawAxis()
        this.drawFunc()
    }
}