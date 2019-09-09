"use strict";

let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
let socket = require('socket.io');
let p2pserver = require('socket.io-p2p-server').Server;
let IO = socket(server);
IO.use(p2pserver);
let port = process.env.PORT || 3000;
let contacts = [];

IO.on('connection', function (socket) {

    p2pserver(socket, null); // New Peer-to-Peer Server;
    let userName = null;
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
        let leave = contacts.indexOf(userName);
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
