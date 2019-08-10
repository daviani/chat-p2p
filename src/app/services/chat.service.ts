import io from 'socket.io-client';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    //names: Array<any> = [];
    messages: Array<any> = [];
    user: string;
                  
    constructor() 
    {
        this.socket = io(this.url);
        this.getName()
        //console.log(this.socket);
    }
    
    public getName()
    {
        this.socket.on('getName', (name) => {
            this.user = name
            //this.names.push(name)
        });
        this.socket.on('newUser', (user) => {
            console.log(user + ' joined us')
        })
    }

    public sendMessage(message: any) 
    {
        this.socket.emit('new-message', message);
        //console.log('Emit : ' + message);        
    }
    
    
    public getMessages() 
    {
        this.socket.on('get', (msg: any) => {
            console.log('Foo Bar' + ' : ' + msg);
            this.messages.push({
                text: msg,
                date: new Date(),
                reply: true,
                user: {
                  name: 'Foo Bar',
                  avatar: 'TWO'
                },
              })
        })
    };
  
        

}