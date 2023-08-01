import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard]},
  /* {path: 'clientes/form', component: ClienteFormComponent, canActivate: [AuthGuard]},
  {path: 'clientes/form/:id', component: ClienteFormComponent, canActivate: [AuthGuard]},
  {path: 'facturas', component: FacturaComponent, canActivate: [AuthGuard]},
  {path: 'facturas/detalles/:id', component: DetallesComponent, canActivate: [AuthGuard]},
  {path: 'facturas/form', component: FacturaFormComponent, canActivate: [AuthGuard]},
  {path: 'facturas/form/:id', component: FacturaFormComponent, canActivate: [AuthGuard]},
  {path: 'articulos', component: ArticuloComponent, canActivate: [AuthGuard]},
  {path: 'articulos/form', component: ArticuloFormComponent, canActivate: [AuthGuard]},
  {path: 'articulos/form/:id', component: ArticuloFormComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/home' } */
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    UsuariosComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    TabMenuModule,
    DialogModule,
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
