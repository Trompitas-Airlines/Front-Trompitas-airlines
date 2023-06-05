import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginUsuario:FormGroup;

constructor( private fb: FormBuilder, private router:Router){
    this.loginUsuario = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]

      })
}

ngOnInit(): void{}

login() {

  const username = this.loginUsuario.value.username;
  const password = this.loginUsuario.value.password;


  if (username === 'Admin' && password === '1234') {

    this.router.navigate(['/dashboard-boton']);
  } else {

  }
}



}

