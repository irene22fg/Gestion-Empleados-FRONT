import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Empleado } from '../model/Empleado';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../model/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl: string = 'http://localhost:8080/api/proyectos';

  constructor(private http: HttpClient, /* private router: Router */) { }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los proyectos:', error);
        return throwError('Error al obtener los proyectos');
      })
    );
  }

  getProyecto(id: number): Observable<Proyecto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Proyecto>(url).pipe(
      catchError((error) => {
        console.error('Error al encontrar proyecto con id: ' + id, error);
        return throwError('Error al encontrar el proyecto');
      })
    );
  }
}
