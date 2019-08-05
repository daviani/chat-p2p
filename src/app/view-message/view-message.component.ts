import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  messages: any;

  constructor() {
  }

  ngOnInit() {

  }

  sendMessage($event: { message: string; files: File[] }) {
  }
}
