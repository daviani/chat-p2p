import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-messenger-main',
  templateUrl: './messenger-main.component.html',
  styleUrls: ['./messenger-main.component.scss']
})
export class MessengerMainComponent implements OnInit,OnDestroy {

  constructor(private jwtService:JwtService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.jwtService.logout();
  }

}
