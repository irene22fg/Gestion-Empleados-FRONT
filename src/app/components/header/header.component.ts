import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private loginService: LoginService, private router: Router){}

  items: any[] = [];
  activeItem: any;
  isLogged: boolean = false;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Empleados', icon: 'pi pi-fw pi-users' },
      { label: 'Evaluaciones', icon: 'pi pi-fw pi-pencil' },
    ];
    this.activeItem = this.items[0];
    this.isLogged = this.isLoggedIn();
  }

  isLoggedIn(){
    if(this.loginService.getToken()){
      return true;
    } else{
      return false;
    }
  }

  logout(){
    if(this.isLoggedIn()){
      this.isLogged = false;
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      this.router.navigate(['/login'])
    }
  }

}
