import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['/'])) },
  { path: '', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'form', component: FormComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
