import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  
  messages: any [] = [];

 
  constructor(private Service: ChatService) {}


  public sendMessage($event: { message: string; files: File[] }, 
  userName: string, avatar: string, reply: boolean) 
  {
  this.Service.sendMessage($event.message);
  console.log('Component: ' + $event.message);
  
  this.Service.getMessages($event.message);
  
   
    this.messages.push({
      text: $event.message,
      date: new Date(),
      reply: false,
      user: {
        name: 'Foo Bar',
        avatar: avatar
      },
    })
  };
  

  

  ngOnInit() { 

  }


}
