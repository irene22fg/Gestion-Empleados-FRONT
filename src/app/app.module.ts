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
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { LoggedGuard } from './guards/logged.guard';
import { HomeComponent } from './components/home/home.component';
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component';
import { PanelModule } from 'primeng/panel';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoggedGuard]},
  {path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'evaluaciones', component: EvaluacionesComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: '**', redirectTo: '/home' }
  /* {path: 'clientes/form', component: ClienteFormComponent, canActivate: [AuthGuard]},
  {path: 'clientes/form/:id', component: ClienteFormComponent, canActivate: [AuthGuard]}, */
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    UsuariosComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    EvaluacionesComponent
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
    DividerModule,
    PanelModule,
    CardModule,
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
