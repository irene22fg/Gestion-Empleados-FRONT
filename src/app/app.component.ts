import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-empleados-FRONT';

  constructor(private loginService: LoginService){}

  isLoggedIn(){
    if(this.loginService.getToken()){
      return true;
    } else{
      return false;
    }
  }
}
