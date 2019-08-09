import {Injectable} from '@angular/core';
import {User} from "../entity/user";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public users: Array<User>;
  public user: User;


  constructor(private http: HttpClient, private jwtService: JwtService,) {
    this.user = new User();
  }


  public getEmail(): Observable<void> {
    return this.jwtService.getUser$().pipe(map((result:Array<object>)=>{
      this.user.email = result['email'];
    }));
  }

  public getUserByEmail(): Observable<void>  {
      return this.http.get('http://localhost:3001/user/' + this.user.email).pipe(map((resultat: Array<object>) => {
        this.user.id = resultat['data']['id'];
      }));
  }

  public getUsers(): void {
    this.users = [];
    this.http.get('http://localhost:3001/users').subscribe((result: Array<object>) => {
      this.users = result['data'].map((obj: object) => {
        return Object.assign(new User(), obj);
      });
    });

  }

  public addUser(newUser: User): Observable<User> {
    console.log(newUser);
    return this.http.post<User>('http://localhost:3001/user', newUser);
  }

}
