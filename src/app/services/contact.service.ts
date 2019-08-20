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
      this.user.email = result['email'];
    }));
  }

  /**
   * request to the API the user's data using an email to retrieve the id and relations of this user
   * put the data into the user attribute of the object
   * @return Observable
   */
  public getUserByEmail(user:string): Observable<void>  {
      return this.http.get('http://localhost:3001/user/' + user).pipe(map((resultat: Array<object>) => {
        this.user.id = resultat['data']['id'];
        this.user.relations = this.user.relations.concat(resultat['data']['relations']);
      }));
  }

  /**
   * Retrieve information of a potential new friend.
   * If this friend exist in the database add a new relation between the user and the new friend
   * @param user
   * @return Observable
   */
  public getNewFriend(user:string): Observable<void> {
    return this.http.get('http://localhost:3001/user/' + user).pipe(map((resultat: Array<object>)=>{
      if (resultat['data']['id'] != ""){
        this.newFriend.id = resultat['data']['id'];
        this.newFriend.email = user;
        this.user.relations.push(this.newFriend.id);
        this.addRelation(this.user.id, this.newFriend.id).subscribe();
        this.addRelation(this.newFriend.id, this.user.id).subscribe();
      }
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
      usr.email = result['data']['email'];
      this.friends.push(usr);
    }));
  }

  /**
   * request to the API the list of all users in the database and put it into the users attribute of the object
   */
  public getUsers(): void {
    this.http.get('http://localhost:3001/users').subscribe((result: Array<object>) => {
      this.users = result['data'].map((obj: object) => {
        return Object.assign(new User(), obj);
      });
    });

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
   * add to the database via a post request to the API a new relation between two users
   * @return Observable
   */
  public addRelation(idUser:number, idFriend:number): Observable<Array<number>> {
    let relation = {
      id_user:idUser,
      friend:idFriend
    };
    return this.http.post<Array<number>>('http://localhost:3001/relation', relation);
  }

}
