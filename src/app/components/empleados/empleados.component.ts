import { Component, InjectFlags, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/model/Empleado';
import { Evaluacion } from 'src/app/model/Evaluacion';
import { Proyecto } from 'src/app/model/Proyecto';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { ProyectoService } from 'src/app/service/proyectos.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  empleados: Empleado[] = [];
  empleado: Empleado = new Empleado();
  proyectosEmpleado: Proyecto[] = [];
  proyectosElegir: Proyecto[] = [];
  evaluaciones: Evaluacion[] = [];
  proyectos: Proyecto[] = [];
  proyecto: Proyecto = new Proyecto();
  activatedRoute: any;
  dialogProyectoVisible: boolean = false;
  dialogAsignarProyectoVisible: boolean = false;
  dialogEmpleadoVisible: boolean = false;
  tittle: string = 'Crear Empleado';
  selectedProyecto: any;
  selectedEmpleado: any;

  constructor(
    private empleadoService: EmpleadoService,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.getEmpleados();
    this.getProyectos();
  }

  showDialogProyecto(id: number) {
    this.dialogProyectoVisible = true;
    this.empleadoService.getEmpleado(id).subscribe(
      (empleado: any) => {
        this.proyectosEmpleado = empleado.proyectos
        this.selectedEmpleado = id;
      }
    )
  }

  showDialogAsignarEmpleado(id: number) {
    this.dialogAsignarProyectoVisible = true;
    this.proyectosElegir = this.proyectos.filter(itemCompleto => !this.proyectosEmpleado.some(itemParcial => itemParcial.id === itemCompleto.id));
  }

  showDialogEmpleado(id: number) {
    this.dialogEmpleadoVisible = true;
    if (id != 0) {
      this.empleadoService.getEmpleado(id).subscribe(
        (empleado) => this.empleado = empleado
      )
      this.tittle = 'Editar empleado'
    } else {
      this.empleado = new Empleado();
    }
  }

  getProyectos() {
    this.proyectoService.getProyectos().subscribe(
      (proyectos) => this.proyectos = proyectos
    )
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (empleados: any) => {
        this.empleados = empleados;
        this.empleados.forEach(empleado => {
          this.usuarioService.getUsuario(empleado.id).subscribe(
            (usuario: any) => {
              empleado.nombreUsuario = usuario.nombre;
            }
          )
        })
        this.empleados.forEach(empleado => {
          empleado.evaluaciones.reverse();
        })
      },
      (error: any) => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }

  create(): void {
    this.empleadoService.create(this.empleado).subscribe(
      response => {
        this.dialogEmpleadoVisible = false;
        Swal.fire('Nuevo empleado', `Empleado '${this.empleado.nombre}' creado con éxito`, 'success')
        location.reload();
      }
    )
  }

  update(): void {
    console.log(this.empleado)
    this.empleado.evaluacionesIds = [];
    this.empleado.proyectosIds = [];
    this.empleadoService.update(this.empleado.id, this.empleado).subscribe(empleado => {
      this.dialogEmpleadoVisible = false;
      Swal.fire('Empleado actualizado', `Empleado '${this.empleado.nombre}' actualizado con éxito`, 'success')
      location.reload();
    }
    )
  }

  updateEmpleado(): void {
    this.proyectoService.getProyecto(this.selectedProyecto).subscribe(
      (proyecto) => {
        this.selectedProyecto = proyecto
        this.empleadoService.getEmpleado(this.selectedEmpleado).subscribe(
          (empleado) => {
            this.empleado = empleado
            this.empleado.proyectos.push(this.selectedProyecto)
            console.log(this.empleado)
            this.empleado.evaluacionesIds = [];
            this.empleado.proyectosIds = [];
            this.empleado.proyectos.forEach( proyecto =>{
              this.empleado.proyectosIds.push(proyecto.id)
            })
            this.empleadoService.update(this.empleado.id, this.empleado).subscribe(empleado => {
              this.dialogAsignarProyectoVisible = false;
              this.dialogProyectoVisible = false;
              Swal.fire('Proyecto asignado', `Proyecto '${this.selectedProyecto.nombre}' asignado a '${this.empleado.nombre}' con éxito`, 'success')
            }
            )
          }
        )
      }
    )
  }

  deleteProyecto(id: number) {
    this.proyectoService.getProyecto(id).subscribe(
      (proyectoSus) => {
        this.empleadoService.getEmpleado(this.selectedEmpleado).subscribe(
          (empleado) => {
            this.empleado = empleado;
            let index = empleado.proyectos.findIndex(proyecto => proyecto.id === proyectoSus.id);
            if (index !== -1) {
              empleado.proyectos.splice(index, 1);
            }
            this.empleado.evaluacionesIds = [];
            this.empleado.proyectosIds = [];
            this.empleado.proyectos.forEach( proyecto =>{
              this.empleado.proyectosIds.push(proyecto.id)
            })
            console.log(empleado)
            this.empleadoService.update(this.empleado.id, this.empleado).subscribe(
              (empleado) => {
                this.dialogProyectoVisible = false;
              Swal.fire('Proyecto desasignado', `Proyecto desasignado a '${this.empleado.nombre}' con éxito`, 'success')
              }
            )
            
          }
        )
      }
    )
  }

  delete(empleadoId: number): void {
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
  }

}
