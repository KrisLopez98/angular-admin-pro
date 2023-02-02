import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('PASO POR EL CAN ACTIVATE DEL GUARD');
    return this.usuarioService.validarToken().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    console.log('PASO POR EL CAN LOAD DEL GUARD');
    return this.usuarioService.validarToken().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
