import { Component, OnInit } from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {User} from "../entity/user";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  private user:User;

  constructor(private jwtService:JwtService, private router: Router) {

  }
  ngOnInit() {

  }

  login(){
    this.router.navigateByUrl('/messenger-main')
  }
}
