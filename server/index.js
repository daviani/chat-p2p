let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let p2pserver = require('socket.io-p2p-server').Server;

let socketIO = require('socket.io');
let io = socketIO(server);

io.use(p2pserver);


const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
      io.emit(message);
      console.log('Server: ' + message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});