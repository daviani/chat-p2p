import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
  //providers: [ChatService]
})
export class ViewMessageComponent implements OnInit {
  
  messages: Array<any> = [];
 
  constructor(private Service: ChatService) 
  {
    this.Service.getName();
    this.Service.getMessages();
    this.messages = this.Service.messages;
  }

  public sendMessage($event: { message: string; files: File[] }) 
  {
  this.Service.sendMessage($event.message);
    
      this.messages.push({
      text: $event.message,
      date: new Date(),
      reply: false, 
      user: {
        name: this.Service.user,
        avatar: 'ON'
      },
    })
  };

  ngOnInit() 
  { 
    
  };


}
