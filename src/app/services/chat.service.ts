import * as io from 'socket.io-client';


export class ChatService {
    private url = 'http://localhost:3000';
    private socket;    

    constructor() 
    {
        this.socket = io(this.url);
    }
    
    public sendMessage(message: any) 
    {
        this.socket.emit('new-message', message);
        console.log('Socket-Emit: ' + message)
    }

    public getMessages(message: any) 
    {
        this.socket.on('new-message', message);
        console.log('Socket-Receive: ' + message)
    };

}