import { Component, OnInit } from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.scss']
})
export class InputBarComponent implements OnInit {



  constructor(private nbSearchService: NbSearchService, private contactService: ContactService) { }

  ngOnInit() {
    //this.search();
  }

  public search() : void {
    this.nbSearchService.onSearchSubmit().subscribe((term)=>{
      this.contactService.getNewFriend(term.term).subscribe(()=>{

      })

    })
  }
}
