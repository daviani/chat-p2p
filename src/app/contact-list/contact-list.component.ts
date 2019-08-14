import { Component, Injectable, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  contacts: Array<any> = [];

  constructor(private Service: ChatService )
   {
      this.Service.contacts = this.contacts;
   }
   
  ngOnInit() {
  }

  }
