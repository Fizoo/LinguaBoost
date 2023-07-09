import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return  this.authService.getIsAuth().pipe(
      tap(isAuth=>{
        console.log('canActivate', isAuth)
        if (!isAuth){
         // console.log(isAuth)
          this.authService.logout()
          this.router.navigate(['/admin/signIn'],{
            queryParams: {
              loginAgain: true
            }
          })

        }
      }),
    )
  }

}
