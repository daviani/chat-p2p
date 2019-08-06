import { Component, OnInit } from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit() {
    this.jwtService.handleAuthCallback();
    console.log(this.jwtService.getUser$());


  }

}
