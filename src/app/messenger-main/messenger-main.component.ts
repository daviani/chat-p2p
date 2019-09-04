import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-messenger-main',
  templateUrl: './messenger-main.component.html',
  styleUrls: ['./messenger-main.component.scss']
})
export class MessengerMainComponent implements OnInit,OnDestroy {

  constructor(private jwtService:JwtService, private contactService: ContactService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.jwtService.logout();
    this.contactService.deleteUser().subscribe();
  }

}
