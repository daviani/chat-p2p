import {Injectable} from '@angular/core';
import {User} from "../entity/user";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public users: Array<User>;
  public friends: Array<User>;
  public user: User;
  public newFriend: User;


  constructor(private http: HttpClient, private jwtService: JwtService,) {
    this.user = new User();
    this.newFriend = new User();
    this.users = [];
    this.friends = [];
  }

  /**
   * retrieve the email from the Json Web Token and put it into the user attribute of the object
   * @return Observable
   */
  public getEmail(): Observable<void> {
    return this.jwtService.getUser$().pipe(map((result:Array<object>)=>{
      this.user.nickname = result['nickname'];
    }));
  }


  /**
   * request to the API the user's data using an id and add the user to the friend's list
   * @param id : number
   * @return Observable
   */
  public getUserById(id:number): Observable<void>{
    let usr = new User();
    return this.http.get('http://localhost:3001/user/id/' + id).pipe(map((result: Array<object>)=>{
      usr.id = result['data']['id'];
      usr.nickname = result['data']['email'];
      this.friends.push(usr);
    }));
  }

  /**
   * request to the API the list of all users in the database and put it into the users attribute of the object
   */
  public getUsers(): Observable<void> {
    return this.http.get('http://localhost:3001/users').pipe(map((result: Array<object>) => {
      this.users = result['data'].map((obj: object) => {
        return Object.assign(new User(), obj);
      });
    }));

  }

  /**
   * add to the database via a post request to the API a new user
   * @param newUser : User
   * @return Observable
   */
  public addUser(newUser: User): Observable<User> {
    return this.http.post<User>('http://localhost:3001/user', newUser);
  }

  /**
   * erase a user in the database via a delete request to the API
   * @return Observable
   */
  public deleteUser(): Observable<Object>{
    return this.http.delete('http://localhost:3001/user/' + this.user.nickname);
  }


}
