import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { OauthCallbackComponent } from './pages/oauth-callback/oauth-callback.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth/callback', component: OauthCallbackComponent },
    { path: '**', component: PageNotFoundComponent }
];
