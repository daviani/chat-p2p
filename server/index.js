var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socket = require('socket.io');
var p2pserver = require('socket.io-p2p-server').Server;
var IO = socket(server);
IO.use(p2pserver);
var port = process.env.PORT || 3000;
var contacts = [];

IO.on('connection', function (socket) {

    p2pserver(socket, null); // New Peer-to-Peer Server;
    var userName = null;
    //retrieve the user nickname and push it to the other users
    socket.on('newUser', function (user) {
        console.log(user + ' connected');
        IO.emit('newUser', user);
        socket.emit('getName', user);
        userName = user;
        contacts.push(user);
        IO.emit('list', contacts);
        console.log(contacts)
    });

    socket.on('new-message', function (message) {
        console.log(userName + ' : ' + message);
        socket.broadcast.emit('get-message', userName, message);
    });
    socket.on('disconnect', function () {
        socket.disconnect();
        IO.emit('off', userName);
        console.log(userName + " disconnected");
        var leave = contacts.indexOf(userName);
        if (leave !== -1) {
            contacts.splice(leave);
        }
    });

    socket.on('go-private', function (data) {
        console.log('Peer Connection')
        socket.broadcast.emit('go-private', data)
      })
});
server.listen(port, function () {
    console.log("started on port: " + port);
});
