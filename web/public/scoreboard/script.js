var socket = io.connect('http://localhost:3000/scoreboard/ppt2');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});

socket.on("hello", function(data) {
    document.body.innerHTML += data + "</br>"
})