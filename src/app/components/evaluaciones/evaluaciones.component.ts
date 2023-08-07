import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/model/Empleado';
import { Evaluacion } from 'src/app/model/Evaluacion';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { EvaluacionService } from 'src/app/service/evaluacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent {

  notas: number[] = [1,2,3,4,5,6];
  empleados: Empleado[] = [];
  evaluacion: Evaluacion = new Evaluacion();
  selectedEmpleado!: number;
  selectedNota!: number;

  constructor(private empleadoService: EmpleadoService, private evaluacionService: EvaluacionService, private router: Router){}

  ngOnInit(): void{
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (empleados: any) => {
        this.empleados = empleados;
      },
      (error: any) => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }

  create(){
    debugger
    console.log(this.evaluacion)
    this.evaluacion.empleadoId = this.selectedEmpleado;
    this.evaluacion.nota = this.selectedNota;
    this.evaluacionService.create(this.evaluacion).subscribe(
      response => {
        this.empleadoService.getEmpleado(this.selectedEmpleado).subscribe(
          (empleado) =>  {
            Swal.fire('Nuevo evaluacion', `Evaluacion para '${empleado.nombre}' creada con éxito`, 'success')
            this.router.navigate(['/empleados']);
          }
        )
      }
    )
  }

}
