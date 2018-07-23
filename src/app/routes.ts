import {Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';

export const appRoutes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"landing", component:LandingComponent},
    {path:"", redirectTo:"/login",pathMatch:"full"}
]