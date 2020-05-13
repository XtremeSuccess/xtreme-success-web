import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  username: string;

  form: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: [null, [Validators.required, Validators.minLength(3)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      mobile_number: [null, [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)]],
      parent_name: [null, [Validators.required, Validators.minLength(6)]],
      school_name: [null, [Validators.required, Validators.minLength(6)]],
      address: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    const formData = {
      firstname: this.form.controls['firstname'].value,
      lastname: this.form.controls['lastname'].value,
      mobile_number: this.form.controls['mobile_number'].value,
      parent_name: this.form.controls['parent_name'].value,
      school_name: this.form.controls['school_name'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      username: uuidv1()
    };
    console.log(formData);

  }

}
