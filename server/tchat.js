"use strict";
exports.__esModule = true;
let express = require("express");
let app = express();

//Connect to Socket.io via HTTP
let server = require('http').Server(app);
let io = require('socket.io')(server);

//Peer-To-Peer Connection..
let p2pserver = require('socket.io-p2p-server').Server;

//Connect logging;
let log4js = require('log4js');
let logger = log4js.getLogger();
let port = 3000;
logger.debug('Script has been started...'); // Test for logging..;
server.listen(port, () => {
    console.log ('Connect to localhost:3000')}); // Connect to localhost:3000 when script runs;

io.on('connection', function (socket) {
    console.log('User connected!');
    let name = 'U' + (socket.id).toString().substr(1, 4); // Generates a new nickname;
    socket.broadcast.emit('newUser', name); // Event 'newUser' to all;
    socket.emit('userName', name); // Event 'userName' => Your new nickname;
    logger.info(name + ' connected to chat!'); // logging;
    
        socket.on('message', function (msg) {
        io.emit(msg);
        console.log(msg);
        logger.warn('-----------'); // Logging
        logger.warn('User: ' + name + ' | Message: ' + msg);
        logger.warn('====> Sending message to other chaters...');
        io.sockets.emit('messageToClients', msg, name); // 'messageToClients' event to all
    });
});
