import { Component } from '@angular/core';
import { Empleado } from 'src/app/model/Empleado';
import { Usuario } from 'src/app/model/Usuario.interface';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nombreUsu: any;
  usuario!: Usuario;
  empleado!: Empleado;

  constructor(private empleadoService: EmpleadoService, private usuarioService: UsuarioService, private loginService: LoginService){}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    this.nombreUsu = localStorage.getItem("usuario");
    this.loginService.getUsuarioNombre(this.nombreUsu).subscribe(
    (usuario) => {this.usuario = usuario   
        console.log(this.usuario)
        this.getEmpleado();
      }
    )
  }

  getEmpleado(){
    this.empleadoService.getEmpleado(this.usuario.id).subscribe(
      (empleado) => this.empleado = empleado
    )
  }

}
