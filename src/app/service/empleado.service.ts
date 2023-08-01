import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Empleado } from '../model/Empleado.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl: string = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient, /* private router: Router */) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los empleados:', error);
        return throwError('Error al obtener los empleados');
      })
    );
  }

  getEmpleado(id: number): Observable<Empleado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Empleado>(url).pipe(
      catchError((error) => {
        console.error('Error al encontrar empleado con id: ' + id, error);
        return throwError('Error al encontrar el empleado');
      })
    );
  }
}
