import {Component, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { SharedModule } from "../../../shared/shared.module";
import { getErrorMsg, invalidField } from "../../../shared/utils";
import {NgIf} from "@angular/common";
import { PrimengModule } from "../../../primeng/primeng.module";
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    PrimengModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {

  errorMsg: string = '';
  invalid: boolean = false;
  initialFormValues: any;
  emailRegExp: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailRegExp)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {  }

  onSubmit() {
    if(this.myForm.valid){
      this.authService.login(this.myForm.get('email')?.value, this.myForm.get('password')?.value)
        .subscribe( response => {
          if(response === true){
            this.invalid = false;
            this.errorMsg = '';
            this.router.navigate(['/admin/tabs']);
          } else{
            this.invalid = true;
            this.errorMsg = 'Something went wrong! Try again.';
          }
        });
    }
  }

  closeErrorMsg() {
    this.invalid = false;
    this.errorMsg = '';
  }

  protected readonly getErrorMsg = getErrorMsg;
  protected readonly invalidField = invalidField;
}
