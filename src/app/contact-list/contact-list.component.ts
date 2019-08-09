import { Component, OnInit } from '@angular/core';
import {ContactService} from "../services/contact.service";
import {User} from "../entity/user";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {


  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.load();

  }

  private load():void{
    this.contactService.getUsers();
    this.contactService.getEmail().subscribe(()=>{
      this.contactService.getUserByEmail().subscribe(()=>{
        console.log(this.contactService.user);
        // @ts-ignore
        if(this.contactService.user.id == ''){
          console.log('ca entre');
          this.contactService.addUser(this.contactService.user).subscribe();
        }
      });

    });



  }



}
