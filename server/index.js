var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var p2pserver = require('socket.io-p2p-server').Server;
var socket = require('socket.io');
var IO = socket(server);
IO.use(p2pserver);
var port = process.env.PORT || 3000;
IO.on('connection', function (socket) {
    var userName = 'U' + (socket.id).toString().substr(1, 4); // Generates a new nickname;
    var contacts = [];
    console.log(userName + ' connected');
    IO.emit('newUser', userName);
    socket.emit('getName', userName);
    contacts.push(userName);
    IO.emit('list', contacts);
    p2pserver(socket, null); // New Peer-to-Peer Server;
    socket.on('new-message', function (message) {
        console.log(userName + ' : ' + message);
        socket.broadcast.emit('get-message', userName, message);
    });
    socket.on('disconnect', function () {
        IO.emit('off', userName);
        console.log(userName + " disconnected");
        var leave = contacts.indexOf(userName);
        if (leave !== -1) {
            contacts.splice(leave);
        }
    });
    //IO.emit('list', contacts);
    //setInterval(Contacts, 5000)
});
server.listen(port, function () {
    console.log("started on port: " + port);
});
