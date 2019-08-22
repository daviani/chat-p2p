
import {ContactService} from "../services/contact.service";
import { Component, Injectable, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  contacts: Array<any> = [];

  constructor(private Service: ChatService, private contactService:ContactService )
   {
      this.Service.contacts = this.contacts;
   }
   
  ngOnInit() {
    //this.load();

  }

  /**
   * retrieve the user's data,
   * if it's a new user add it to the database otherwise load the friends list
   */
  private load():void{
    this.contactService.getEmail().subscribe(()=>{
      this.contactService.getUserByEmail().subscribe(()=>{
        // @ts-ignore
        if(this.contactService.user.id == ''){
          //new user : add it to the database
          this.contactService.addUser(this.contactService.user).subscribe();
        }else {
          //identified user : load the friends list
          this.contactService.user.relations.forEach((element)=>{
            this.contactService.getUserById(element).subscribe();
          })
        }
      });
    });
  }


}

 
