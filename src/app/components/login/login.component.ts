import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  mensaje: string = '';

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(Router) private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: '',
      contrasena: ''
    });
  }

  submit() {
    this.loginService.login(this.form.value).subscribe(
      (response:any) => {
        console.log(response)
        if(!localStorage.getItem("token")){
          localStorage.setItem("token", response.token)
          if(!localStorage.getItem("Usuario")){
            localStorage.setItem("usuario", response.Username)
            if(!localStorage.getItem("roles")){
              this.loginService.getUsuarioNombre(response.Username).subscribe(
                (usuario:any) => {
                  let roles: string[] = [];
                  usuario.roles.forEach((rol: { rol: string; }) => { roles.push(rol.rol )})
                  localStorage.setItem("roles", JSON.stringify(roles))
                }
              )
            }
          }
        }
        this.router.navigate(['/home']);
      },
      (error:any) => {
        this.mensaje = 'Usuario inválido';
        console.error('Error al hacer login:', error);
      });
  }

}

