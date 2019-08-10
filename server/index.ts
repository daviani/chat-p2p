
let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let p2pserver = require('socket.io-p2p-server').Server;

let socket = require('socket.io');
let io = socket(server);

io.use(p2pserver);



const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    const userName = 'U' + (socket.id).toString().substr(1, 4); // Generates a new nickname;
    console.log(userName + ' connected');
    socket.emit('newUser', userName); // Event 'newUser' to all;
    let msg = 'hello';
    io.emit('getName', userName); 

    socket.on('new-message', (message: any) => {
      console.log(userName + ' : ' + message);
      socket.broadcast.emit('get', message); 
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});