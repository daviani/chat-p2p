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
    this.updateContacts();
    this.peerUpdate();
    this.peer
  }

  public getName(): void {
    this.peer.on('getName', (name) => {
      this.user = name;
      console.log('This Peer: ' + name);
    })
  };

  public Connect(): void {
    let opts = {autoUpgrade: false, numClients: 10};
    this.peer = new P2P(this.socket, opts);
    this.contactService.getEmail().subscribe(() => {
      this.peer.emit('newUser', this.contactService.user.nickname);
        this.peer.on('newUser', (user) => {
        this.chatBot(user + ' connected');
      });
    });

  };

  // Sets Peer-to-Peer Connection:

  public peerUpdate(): void {
    this.peer.on('go-private', () => {
      console.log('Peer Connection Established');
      this.peer.upgrade();
      this.peer.useSockets = false;
      this.chatBot('Beer-to-Bear!')
    })
  }

  public goPrivate(): void { 
      console.log('OK')
      this.peer.emit('go-private', true)
      this.peer.useSockets = false
      this.peer.usePeerConnection = true;
      this.peer.upgrade();
      this.chatBot('Beer-to-Bear!');
      }

  public updateContacts(): void {
    this.peer.on('list', (contacts) => {
      console.log(contacts);
          contacts.forEach((item) => 
          {
            if (this.contacts.findIndex(item => item.name !== item)){
              this.userList(item);
              console.log(item)
              console.log(this.contacts.findIndex(item => item.name))
          }}
        )}
      )};

  public Disconnect(): void {
    this.peer.on('off', (user: string) => {
      this.peer.disconnect()
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


  public getMessages(): void {
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
