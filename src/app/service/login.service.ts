import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRequest } from '../model/UsuarioRequest.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../model/Usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient, @Inject(Router) private router: Router) { }

  login(usuario: UsuarioRequest): Observable<any> {
    return this.http.post<UsuarioRequest>(this.apiUrl + "/login", usuario).pipe(
      catchError((error) => {
        console.error('Error al hacer login:', error);
        return throwError('Error al hacer login');
      })
    );
  }

  getUsuarioNombre(nombre: String): Observable<Usuario> {
    const url = `${this.apiUrl}/api/usuarios/nombre/${nombre}`;
    return this.http.get<Usuario>(url).pipe(
      catchError((error) => {
        console.error('Error al encontrar usuario: ' + nombre, error);
        return throwError('Error al encontrar usuario');
      })
    );
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
