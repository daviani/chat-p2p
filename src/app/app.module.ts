import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbInputModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FooterComponent} from './mention legal/footer.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { MessengerMainComponent } from './messenger-main/messenger-main.component';
import { RegisterComponent } from './register/register.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { InputBarComponent } from './input-bar/input-bar.component';

@NgModule({
  declarations: [

    AppComponent,
    FooterComponent,
    HomeComponent,
    LogInComponent,
    MessengerMainComponent,
    RegisterComponent,
    ContactListComponent,
    ViewMessageComponent,
    InputBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
