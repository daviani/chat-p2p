import { Component, OnInit } from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private jwtService:JwtService, private router:Router) { }

  ngOnInit() {
    this.jwtService.localAuthSetup();
  }

  login(){
    this.router.navigateByUrl('/messenger-main')
  }

}
