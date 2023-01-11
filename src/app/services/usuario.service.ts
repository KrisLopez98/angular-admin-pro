import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

declare const google: any;
declare const gapi: any;

// TAP DISPARA UN EFECTO SECUNDARIO
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  constructor(private http: HttpClient, private router: Router) {
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}login/renew`, { headers: { 'x-token': token } })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        }),
        map(response => true),
        catchError(error => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${base_url}usuarios`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  login(loginData: LoginForm) {
    return this.http
      .post(`${base_url}login`, loginData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}login/google`, { token: token }).pipe(
      tap((resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
    google.accounts.id.revoke('krystalv9809@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }
}
