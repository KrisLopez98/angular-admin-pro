import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdmiGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    console.log('admi-guard');
    if(this.usuarioService.role === 'ADMI_ROLE') {
      return true
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
