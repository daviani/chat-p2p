import { Injectable } from '@angular/core';
import {User} from "../entity/user";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public users : Array<User> ;
  private user : User;

  constructor(private http:HttpClient, private jwtService: JwtService,) {
    this.user = new User();
    //this.getUserByEmail();
  }


  public getUserByEmail():void{
    this.jwtService.getUser$().subscribe((result:Array<object>)=>{
      this.user.email = result['email'];
      this.http.get('http://localhost:3000/user/' + this.user.email).subscribe((resultat:Array<object>)=>{
          this.user.id = Object.assign(this.user.id,result['id']);
      });
    });
  }

  public getUsers():void{
    this.users = [];
    this.http.get('http://localhost:3000/users').subscribe((result:Array<object>)=>{
      this.users = result['data'].map((obj: object) => {
        return Object.assign(new User(),obj);
      });
    });

  }
  public addUser(newUser: User):void{
    console.log(newUser);
    this.http.post<User>('http://localhost:3000/user', newUser).subscribe();
  }

}
