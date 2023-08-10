import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';  
import { userModel } from '../_models/userModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  usermodel: userModel = {} as userModel;

  constructor(private fb: FormBuilder, private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void 
  {
   
  }

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, RetypeConfirm('password')]]
  });

  onSubmit() {
    if(!this.registrationForm.valid)
        return;
    
    if(this.registrationForm.valid)
    {
      this.usermodel = this.registrationForm.value;
    
      this.accountService.register(this.usermodel).subscribe({
        next: (data: userModel) => {
          this.usermodel = data;
          this.registrationForm.reset();
          this.toastr.info("Registration Successful!", "Success");
          this.router.navigate(['/login ']);
        }
      });
    }
  }

  get f(){
    return this.registrationForm.controls;
  }

  clearConfirmPassword()
  {
    this.registrationForm.controls.confirmPassword.setValue("");
  }

}

function RetypeConfirm(newpassword: string): ValidatorFn {
  return (control: FormControl) => {

      if (!control || !control.parent) {
          return null;
      }
      return control.parent.get(newpassword).value === control.value ? null : { mismatch: true };
  };
}