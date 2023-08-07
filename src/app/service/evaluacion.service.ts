import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Evaluacion } from '../model/Evaluacion';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private apiUrl: string = 'http://localhost:8080/api/evaluaciones';

  constructor(private http: HttpClient) { }

  getEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener las evaluaciones:', error);
        return throwError('Error al obtener las evaluaciones');
      })
    );
  }

  getEvaluacion(id: number): Observable<Evaluacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Evaluacion>(url).pipe(
      catchError((error) => {
        console.error('Error al encontrar la evaluacion con id: ' + id, error);
        return throwError('Error al encontrar la evaluacion');
      })
    );
  }

  create(evaluacion: Evaluacion): Observable<Evaluacion> {
    return this.http.post<Evaluacion>(this.apiUrl, evaluacion).pipe(
      catchError((error) => {
        console.error('Error al crear la evaluacion:', error);
        return throwError('Error al crear la evaluacion');
      })
    );
  }

  update(id: number, evaluacion: Evaluacion): Observable<Evaluacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Evaluacion>(url, evaluacion).pipe(
      catchError((error) => {
        console.error(`Error al actualizar la evaluacion con ID ${id}:`, error);
        return throwError(`Error al actualizar la evaluacion con ID ${id}`);
      })
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error(`Error al eliminar la evaluacion con ID ${id}:`, error);
        return throwError(`Error al eliminar la evaluacion con ID ${id}`);
      })
    );
  }
}
