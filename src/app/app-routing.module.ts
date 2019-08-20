import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LogInComponent} from './log-in/log-in.component';
import {MessengerMainComponent} from './messenger-main/messenger-main.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from "./auth/auth.guard";
import {CallbackComponent} from "./callback/callback.component";
import {FooterComponent} from './terms-of-use/footer.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'log', component: LogInComponent},
  {path: 'messenger-main', component: MessengerMainComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'footer', component: FooterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
  ]
})
export class AppRoutingModule {
}
