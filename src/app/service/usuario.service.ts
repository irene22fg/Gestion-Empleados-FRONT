import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Empleado } from '../model/Empleado';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/Usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, /* private router: Router */) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los empleados:', error);
        return throwError('Error al obtener los empleados');
      })
    );
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      catchError((error) => {
        console.error('Error al encontrar usuario con id: ' + id, error);
        return throwError('Error al encontrar usuario');
      })
    );
  }
}