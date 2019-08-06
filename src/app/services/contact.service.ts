import { Injectable } from '@angular/core';
import {User} from "../entity/user";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public user : User;
  constructor() { }


}
