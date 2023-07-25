import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutusComponent } from './aboutus/aboutus.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'member', component: MemberComponent, canActivate: [AuthGuard]},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
