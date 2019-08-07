import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-messenger-main',
  templateUrl: './messenger-main.component.html',
  styleUrls: ['./messenger-main.component.scss']
})
export class MessengerMainComponent implements OnInit,OnDestroy {

  constructor(private jwtService:JwtService, private contact: ContactService) { }

  ngOnInit() {
    this.jwtService.getUser$().subscribe((result:Array<object>)=>{
      console.log(result['name']);
    });
  }

  ngOnDestroy() {
    this.jwtService.logout();
  }

}
