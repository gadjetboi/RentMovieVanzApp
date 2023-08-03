import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenModel } from '../_models/tokenModel';
import { userModel } from '../_models/userModel';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MemberModel } from '../_manageState/_stateModels/memberModel';
import { Store } from '@ngrx/store';

interface AppState {
  member: MemberModel
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  
  member: Observable<MemberModel>;
  currentToken$: Observable<tokenModel>;
  userModel: userModel = {} as userModel;

  constructor(public accountService: AccountService, 
    private toastr: ToastrService, 
    private router: Router,
    private store: Store<AppState>) { 
      this.member = store.select('member');
    }

  ngOnInit(): void {
    this.currentToken$ = this.accountService.currentToken$;
    this.clearLoginForm();
  }

  login() {
     this.accountService.login(this.userModel).subscribe(response => {
       console.log(response.userName);
        this.store.dispatch({ type: 'LOGIN', payload: response.userName });
        this.toastr.success('Log In Successfully', 'Successful');
        this.clearLoginForm();    
        this.router.navigate(['/member']);
     });
  }

  logout() {
    this.store.dispatch({ type: 'LOGIN', payload: ''});
    this.accountService.logout();
    this.clearLoginForm();
    this.toastr.success('Log Out', 'Successful');
    this.router.navigate(['/home']);
  }

  clearLoginForm() {
    this.userModel.userName = '';
    this.userModel.password = '';
  }
  
}
