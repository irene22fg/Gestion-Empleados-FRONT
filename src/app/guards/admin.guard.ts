import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  roles: any = ''

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.roles = localStorage.getItem("roles");
      this.roles = JSON.parse(this.roles);

      if(!this.roles.includes("ADMIN")){
        this.router.navigate(['/home'])
        return false;
      }else{
        return true;
      }

  }
  
}
