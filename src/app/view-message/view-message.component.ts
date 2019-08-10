import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
  providers: [ChatService]
})
export class ViewMessageComponent implements OnInit {
  
  messages: any [] = [];
  
 
  constructor(private Service: ChatService) 
  {
    this.Service.getMessages();
    this.messages = this.Service.messages
  }

  public sendMessage($event: { message: string; files: File[] }, 
  userName: string, avatar: string, reply: boolean) 
  {
  this.Service.sendMessage($event.message);
  console.log(this.Service.user + ' : ' + $event.message);
  
      this.messages.push({
      text: $event.message,
      date: new Date(),
      reply: false, 
      user: {
        name: this.Service.user,
        avatar: 'ONE'
      },
    })
  };

  ngOnInit() 
  { 
    
  };


}
