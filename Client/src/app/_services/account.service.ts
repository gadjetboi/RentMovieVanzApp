import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { tokenModel } from '../_models/tokenModel';
import { userModel } from '../_models/userModel';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = 'https://rentmovievanzappapi.azurewebsites.net/api/';
  //private baseUrl: string = 'https://localhost:7109/api/';
  
  private currentTokenSource = new ReplaySubject<tokenModel>(1);
  currentToken$ = this.currentTokenSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  setCurrentToken(tokenModel: tokenModel) {
    this.currentTokenSource.next(tokenModel);
  }

  login(userModel: userModel) {
   
    if(userModel.username == "" && userModel.password == "") {
      this.toastr.error("Username and Password are Required!", "Error");
      return;
    }
    
    return this.http.post(this.baseUrl + 'Authenticate/login', userModel).pipe(
      map((tokenModel: tokenModel) => {
        if(tokenModel) {
          localStorage.setItem('token', JSON.stringify(tokenModel));
          this.currentTokenSource.next(tokenModel);
        }
      })
    );
  }

  register(userModel: userModel) {
    return this.http.post(this.baseUrl + 'Authenticate/register', userModel)
  }
  
  logout() {
    localStorage.removeItem('token');
    this.currentTokenSource.next(null);
  }
  
}

