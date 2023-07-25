import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void 
  {
  }


  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, RetypeConfirm('password')]]
  });

  onSubmit() {
    console.log(this.registrationForm);
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.controls.firstName.errors?.required);
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