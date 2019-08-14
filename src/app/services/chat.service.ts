import * as io from 'socket.io-client';
import * as P2P from 'socket.io-p2p';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    private peer;

    //names: Array<any> = [];
    messages: Array<any> = [];
    contacts: Array<any> = [];
    list: Array<any> = [];
    sender: string;

                  
    constructor() 
    {
        this.socket = io(this.url);
        this.peer = new P2P(this.socket);
        this.Connect();
        this.Disconnect();
        
        //console.log(this.socket);
    }
    
    public getName()
    {
        this.socket.on('getName', (name) => {
        this.sender = name;
        console.log('This Socket: ' + name);
        })
    };

    public Connect () 
    {    
        this.socket.on('newUser', (user) => {
            this.chatBot(user + ' connected');
            this.userList(user);
         })
         this.updateContacts()
    };

    public updateContacts()
    {
        this.socket.on('list', (contacts) => 
        { console.log(contacts);
            contacts.forEach((element) =>
            {  
                let online = this.contacts.some(item => item.name === element)
                console.log(online)
                if (this.sender !== element && !online)
                {
                    this.userList(element);
                    return this.contacts
                }
            })
        })
    } 

    public Disconnect()
    {
        this.socket.on('off', (user: string) => {
            this.chatBot(user + ' disconnected');
            let leave = this.contacts.findIndex(item => item.name == user);
            if (leave !== -1) {
                this.contacts.splice(leave, 1);
            }})
    };
        
    public sendMessage(message: any) 
    {
        this.socket.emit('new-message', message);
        //console.log('Emit : ' + message);        
    };
    
    public chatBot (msg: string)
    {
        this.messages.push({
            reply: true,
            user: {
              name: msg,
              avatar: 'TWO'
            },
          })
    };
    
    public getMessages() 
    {
        this.socket.on('get', (userName, message) => {
            console.log(userName + ' : ' + message);
            this.messages.push({
                text: message,
                date: new Date(),
                reply: true,
                user: {
                  name: userName,
                  avatar: 'TWO'
                },
              })
        })
    };
    
    private userList(item)
    {
        this.contacts.push({
            shape: "round",
            size: "medium",
            name: item,
            title: 'User'
        })
    }
        

}