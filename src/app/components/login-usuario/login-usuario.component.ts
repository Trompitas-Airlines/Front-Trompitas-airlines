import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {
  loginUsuario:FormGroup;

constructor( private fb: FormBuilder, private router:Router, private userServ:UsuariosService){
    this.loginUsuario = this.fb.group({
      cedula: ['', Validators.required]


      })
}

usuarios:any[]=[]

ngOnInit(): void{

  this.userServ.getUsuarios().subscribe(dat => {this.usuarios = dat})

}
error: boolean = false

login() {
  console.log(this.usuarios)

  const cedula = this.loginUsuario.value.cedula;

  for(let i = 0; i < this.usuarios.length; i++){
    if(this.usuarios[i].cedula === cedula){
      this.router.navigate(['/boton-loginUsario']);
      return

    }


  }
 this.error=true








}

}
