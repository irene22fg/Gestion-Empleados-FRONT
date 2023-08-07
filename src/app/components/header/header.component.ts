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

  isLogged: boolean = false;
  //isAdminB: boolean = false;
  roles: any; 

  ngOnInit() {
    this.isLogged = this.isLoggedIn();
    this.isAdmin();
  }

  isAdmin(){
    this.roles = localStorage.getItem("roles");
    this.roles = JSON.parse(this.roles);
    if(this.roles.includes("ADMIN")){
      return true;
    } else{
      return false;
    }
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
      localStorage.removeItem('usuario')
      this.router.navigate(['/login'])
    }
  }

}
