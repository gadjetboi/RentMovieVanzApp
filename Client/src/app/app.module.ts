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
import { StoreModule } from '@ngrx/store';
import { memberReducer } from './_manageState/_reducers/member.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxLoadingModule } from "ngx-loading";
import { CartComponent } from './_common/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutusComponent,
    RegisterComponent,
    MemberComponent,
    DetailComponent,
    VideogularComponent,
    CartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    VgCoreModule,
    ReactiveFormsModule,
    MatTableModule,
    StoreModule.forRoot({
      member: memberReducer
    }),
    StoreDevtoolsModule.instrument({ 
      maxAge: 10
    }),
    NgxLoadingModule.forRoot({}),
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptor, 
    multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
