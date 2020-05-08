import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  username: string;
  confirm_password: string;

  constructor() { }

  ngOnInit(): void {
  }

  register() {

  }

}
