var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var p2pserver = require('socket.io-p2p-server').Server;
var socketIO = require('socket.io');
var io = socketIO(server);
io.use(p2pserver);
var port = process.env.PORT || 3000;
io.on('connection', function (socket) {
    var userName = 'U' + (socket.id).toString().substr(1, 4); // Generates a new nickname;
    console.log(userName + ' connected');
    socket.broadcast.emit('newUser', userName); // Event 'newUser' to all;
    socket.emit('userName', userName); // Event 'userName' => Your new nickname;
    
    socket.on('new-message', function (message) {
        io.emit(message);
        console.log(userName + ' : ' + message);
    });
});
server.listen(port, function () {
    console.log("started on port: " + port);
});
