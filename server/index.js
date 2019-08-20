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
    var contacts = [];
    var userName = null;
    //retrieve the user nickname and push it to the other users
    socket.on('newUser', function (user) {
        console.log(user + ' connected');
        IO.emit('newUser', user);
        socket.emit('getName', user);
        userName = user;
        contacts.push(user);
        IO.emit('list', contacts);
    });
    //const userName = 'U' + (socket.id).toString().substr(1, 4); // Generates a new nickname;
    console.log(contacts);
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
