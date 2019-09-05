import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ChatService]
})

export class AppComponent {


  title = 'Youpi! Bear for Bear!';

  constructor(private Service: ChatService)
  {

  }

  
}

