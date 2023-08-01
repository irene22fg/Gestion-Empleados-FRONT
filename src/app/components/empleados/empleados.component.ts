import { Component } from '@angular/core';
import { Empleado } from 'src/app/model/Empleado.interface';
import { Evaluacion } from 'src/app/model/Evaluacion.interface';
import { Proyecto } from 'src/app/model/Proyecto.interface';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  empleados: Empleado[] = [];
  proyectosEmpleado: Proyecto[] = [];
  evaluaciones: Evaluacion[] = [];
  activatedRoute: any;
  ClienteService: any;
  paginador: any;
  dialogVisible: boolean = false;

  constructor(private empleadoService: EmpleadoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  showDialog(id:number) {
    this.dialogVisible = true;
    this.empleadoService.getEmpleado(id).subscribe(
      (empleado: any) =>{
        this.proyectosEmpleado = empleado.proyectos
      }
    )
}

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (empleados:any) => {
        this.empleados = empleados;
        this.empleados.forEach(empleado=>{
          this.usuarioService.getUsuario(empleado.id).subscribe(
            (usuario: any)=>{
              empleado.nombreUsuario = usuario.nombre;
            }
          )
        })
      },
      (error:any) => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }

/*   clientesPaginados(): void {
    this.activatedRoute.paramMap.subscribe( (params: { get: (arg0: string) => string | number; }) => {
      let page:number = +params.get('page');  //El operador suma convierte a int
      if(!page)
        page = 0;
      this.ClienteService.getClientes(page).subscribe(
        ( response: { content: Cliente[]; }) => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      })});
  } */

/*   delete(empleadoId: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Quiere borrar al empleado?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.delete(empleadoId).subscribe(
          () => {
            this.getEmpleados();
          });
        Swal.fire(
          'Eliminado',
          'Eliminado con éxito',
          'success'
        )
      }
    })
  } */

}
