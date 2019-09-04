import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbInputModule,
  NbLayoutModule,
  NbSearchModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FooterComponent} from './terms-of-use/footer.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { MessengerMainComponent } from './messenger-main/messenger-main.component';
import { RegisterComponent } from './register/register.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { InputBarComponent } from './input-bar/input-bar.component';
import {HttpClientModule} from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';
import {FormsModule} from "@angular/forms";
import {JwtService} from "./services/jwt.service";
import { CallbackComponent } from './callback/callback.component';


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
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbChatModule,
    NbUserModule,
    NbCardModule,
    NbSearchModule,
    NbButtonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),
    FormsModule

  ],
  providers: [
    ChatService,
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
