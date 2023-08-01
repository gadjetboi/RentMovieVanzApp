import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { VgCoreModule, } from 'ngx-videogular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { MemberComponent } from './member/member.component';
import { SharedModule } from './_modules/shared.module';
import { DetailComponent } from './detail/detail.component';
import { VideogularComponent } from './_common/videogular/videogular.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './_interceptor/http-error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutusComponent,
    RegisterComponent,
    MemberComponent,
    DetailComponent,
    VideogularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    VgCoreModule,
    ReactiveFormsModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptor, 
    multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
