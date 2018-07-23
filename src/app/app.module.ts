import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LocaleService } from './locale.service';
import { LandingComponent } from './landing/landing.component';



 @NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent
  ],
  imports: [
    FormsModule, BrowserModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [LocaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
