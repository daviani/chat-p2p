import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {ContactService} from "../services/contact.service";
import { ChatService } from "../services/chat.service";

@Component({
  selector: 'app-messenger-main',
  templateUrl: './messenger-main.component.html',
  styleUrls: ['./messenger-main.component.scss']
})
export class MessengerMainComponent implements OnInit, OnDestroy {

  constructor(private jwtService:JwtService, private contactService: ContactService, private Service: ChatService) { }

  public goPrivate(): void
  {
    this.Service.goPrivate();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.jwtService.logout();
    this.contactService.deleteUser().subscribe();
  }

}
