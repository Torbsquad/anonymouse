function main(io){
    var _io = io.of("/scoreboard/ppt2")
    
    _io.on('connection', function(client) {
        console.log('Client connected...');
        
        client.on('join', function(data) {
            _io.emit('hello', "miep")
            console.log(data);
        });

    });
    
}

module.exports = main