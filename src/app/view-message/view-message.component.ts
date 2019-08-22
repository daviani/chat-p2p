import {Component, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {ContactService} from "../services/contact.service";


@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
  //providers: [ChatService]
})
export class ViewMessageComponent implements OnInit {


messages: Array<any> = [];
privateMode: number = 1;

  constructor(private Service: ChatService, private contactService:ContactService)
  {
    this.Service.getName();
    this.Service.getMessages(1);
    this.messages = this.Service.messages;
  }



  public sendMessage($event: { message: string; files: File[] })
  {
    if (this.privateMode == 1){
      this.Service.sendPrivateMessage($event.message)
    }else{
      this.Service.sendMessage($event.message);
    }


      this.messages.push({
      text: $event.message,
      date: new Date(),
      reply: false,
      user: {
        name: this.contactService.user.email,
        avatar: 'ON'
      },
    })


  };

  ngOnInit() {

  }

}
