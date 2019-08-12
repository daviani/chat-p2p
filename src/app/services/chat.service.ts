import io from 'socket.io-client';


export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    private _messages: Array<any> = [];

    constructor()
    {
        this.socket = io(this.url);
        console.log();
        this._messages.push
    }

    public sendMessage(message: any)
    {
        this.socket.emit('new-message', message);
        console.log('Emit : ' + message);

    }

    public get Messages() {
        return this._messages;
    }

    public getMessages()
    {
        this.socket.on('get', (message) => {
        console.log('Socket-Receive: ' + message)
        })};

}
