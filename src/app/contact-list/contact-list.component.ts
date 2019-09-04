import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactService} from "../services/contact.service";
import {ChatService} from '../services/chat.service';


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
  private load(): void {
    this.contactService.getEmail().subscribe(()=>{
      this.contactService.getUsers().subscribe(()=>{
        //new user : add it to the database
        //this.service.Connect(this.contactService.user.email);
        this.contactService.addUser(this.contactService.user).subscribe();
      });
    });


  }


}

