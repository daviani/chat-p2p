import * as io from 'socket.io-client';
import * as P2P from 'socket.io-p2p';
import {ContactService} from "./contact.service";


export class ChatService {

  private url = 'http://localhost:3000';
  private socket = io(this.url);
  private peer: P2P;

  messages: Array<any> = [];
  contacts: Array<any> = [];
  list: Array<any> = [];
  user: string;

  constructor(private contactService: ContactService) {
    this.Connect();
    this.Disconnect();
  }

  public getName(): void {
    this.peer.on('getName', (name) => {
      this.user = name;
      console.log('This Peer: ' + name);
    })
  };

  public Connect(): void {

    this.peer = new P2P(this.socket);
    this.contactService.getEmail().subscribe(() => {
      this.peer.emit('newUser', this.contactService.user.nickname);
      this.peer.usePeerConnection = true; // Sets Peer-to-Peer Connection
      this.goPrivate();
      this.peer.useSockets = false;
      this.peer.on('newUser', (user) => {
        this.chatBot(user + ' connected');
        this.updateContacts();
      });
    });

  };

  public goPrivate():void{
    this.peer.upgrade();
  }

  public updateContacts(): void {
    this.peer.on('list', (contacts) => {
      contacts.forEach((element) => {
        this.userList(element);
      })
    })
  }

  public Disconnect(): void {
    this.peer.on('off', (user: string) => {
      this.chatBot(user + ' disconnected');
      let leave = this.contacts.findIndex(item => item.name == user);
      if (leave !== -1) {
        this.contacts.splice(leave, 1);
      }
    })
  };

  public sendMessage(message: any): void {
    this.socket.emit('new-message', message);
    console.log('Emit : ' + message);
  };

  public sendPrivateMessage(message: any): void{
    this.peer.emit('new-message', message);
  }


  public getMessages(privateMode:number): void {
    if (privateMode == 1){
      this.peer.on('new-message', ( message: any) => {
        console.log(message);
        this.messages.push({
          text: message,
          date: new Date(),
          reply: true,
          user: {
            name: 'userName',
            avatar: 'TWO'
          },
        })
      })
    }else{
      this.socket.on('get-message', (userName: string, message: any) => {
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
    }

  };

  // Adding to Contacts:

  private userList(item): void {
    this.contacts.push({
      shape: "round",
      size: "medium",
      name: item,
      title: 'Peer'
    })
  }

  // Service Messages:

  public chatBot(msg: string): void {
    this.messages.push({
      reply: true,
      user: {
        name: msg,
        avatar: 'TWO'
      },
    })
  };

}
