import { Component, OnInit } from '@angular/core';
import {ContactService} from "../services/contact.service";
import {NbSearchService} from "@nebular/theme";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {



  constructor(private contactService:ContactService, private nbSearchService: NbSearchService) { }

  ngOnInit() {
    this.load();
    this.nbSearchService.onSearchSubmit().subscribe((term)=>{
      this.loadContact();
    })

  }

  /**
   * retrieve the user's data,
   * if it's a new user add it to the database otherwise load the friends list
   */
  private load():void{
    this.contactService.getEmail().subscribe(()=>{
      this.contactService.getUserByEmail(this.contactService.user.email).subscribe(()=>{
        // @ts-ignore
        if(this.contactService.user.id == ''){
          //new user : add it to the database
          this.contactService.addUser(this.contactService.user).subscribe();
        }else {
          //identified user : load the friends list
          this.loadContact();
        }
      });
    });
  }

  /**
   * Retrieve the information of each relation of the user
   */
  private loadContact():void{
    this.contactService.friends.length = 0;
    this.contactService.user.relations.forEach((element)=>{
      this.contactService.getUserById(element).subscribe();
    })
  }


}
