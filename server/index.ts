
let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let p2pserver = require('socket.io-p2p-server').Server;

let socket = require('socket.io');
let IO = socket(server);

IO.use(p2pserver);


const port = process.env.PORT || 3000;

IO.on('connection', (socket) => {
    const userName = 'U' + (socket.id).toString().substr(1, 4); // Generates a new nickname;
    let contacts: Array<any> = [];

    console.log(userName + ' connected');
    IO.emit('newUser', userName);
    socket.emit('getName', userName);

    contacts.push(userName);
    IO.emit('list', contacts);
    function remove(array, element) {
      return array.filter(el => el !== element);
    }
    //setInterval(sayHello, 300);

    /*io.clients((error, clients) => {
      if (error) throw error;
      console.log(clients)
      }); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]*/
    


    socket.on('new-message', (message: any) => {
      console.log(userName + ' : ' + message);
      socket.broadcast.emit('get', userName, message);
    });

    socket.on('disconnect', function () {
      IO.emit('off', userName);
      console.log(userName + " disconnected");
      const leave = contacts.indexOf(userName);
            if (leave !== -1) {
            contacts.splice(leave);
    }})

    function Ok() 
    {
      IO.emit('list', contacts);
    }
    
    setInterval(Ok, 5000)

});


server.listen(port, () => {
    console.log(`started on port: ${port}`);
});