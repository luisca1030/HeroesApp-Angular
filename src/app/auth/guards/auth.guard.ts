import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, RouterStateSnapshot, UrlSegment, UrlTree, CanActivate, Router, Route } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  idlogin: string | null = "";

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return  this.authService.verificaAutenticacion()
                    .pipe(
                       tap(isAutherized => {
                            if(!isAutherized){
                                this.router.navigate(['./auth/login']);
                            }
                       } )
                    );
    //   this.idlogin = localStorage.getItem('token');
    // if (this.idlogin !== null) {
    //   return true;
    // }

    // // if (this.authService.auth.id) {
    // //   return true;
    // // }

    // console.log ('Bloqueado por el AuthGuard -CanActive');
    // return false;
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {


      return  this.authService.verificaAutenticacion()
      .pipe(
         tap(isAutherized => {
              if(!isAutherized){
                  this.router.navigate(['./auth/login']);
              }
         } )
      );

    // this.idlogin = localStorage.getItem('token');
    // console.log(this.idlogin);

    // if (this.idlogin !== null) {
    //   return true;
    // }
    // console.log ('Bloqueado por el AuthGuard -Canload');
    // // console.log ('canLoad' ,true);
    // // console.log (route);
    // // console.log (segments);
    // return false;
  }
}
