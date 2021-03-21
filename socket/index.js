function init(name,io){
    try{
        require(name)(io)
    }
    catch(err){
        console.log(err.message)
    }
}

function main(server){
    
    const io = require("socket.io")(server, {
        origins: '*:*'
    })

    init("./scoreboard/ppt2", io)
    init("./tts/vanfriedricht", io)
}

module.exports = main