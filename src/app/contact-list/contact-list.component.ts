<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {ContactService} from "../services/contact.service";
=======
import { Component, Injectable, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
>>>>>>> anton

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

<<<<<<< HEAD


  constructor(private contactService:ContactService) { }
=======
  contacts: Array<any> = [];
>>>>>>> anton

  constructor(private Service: ChatService )
   {
      this.Service.contacts = this.contacts;
   }
   
  ngOnInit() {
    this.load();

  }

<<<<<<< HEAD
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
=======
  }
>>>>>>> anton
