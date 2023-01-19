import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const google: any;

// TAP DISPARA UN EFECTO SECUNDARIO
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario?: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario?.uid || ''
  }

  validarToken(): Observable<boolean> {
    google.accounts.id.initialize({
      client_id:
        '979336605425-8h0cloi8vg05dggkfq4lqebvhough1pm.apps.googleusercontent.com',
    });
    const token = this.token;
    return this.http
      .get(`${base_url}login/renew`, { headers: { 'x-token': token } })
      .pipe(
        map((response: any) => {
          const {
            email,
            google,
            nombre,
            role,
            img = '',
            uid,
          } = response.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token', response.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${base_url}usuarios`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  actualizarPefil(data: { email: string; nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario!.role!
    }
    return this.http.put(`${base_url}usuarios/${this.uid}`, data, {
      headers: { 'x-token': this.token },
    });
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
    const usuario = localStorage.getItem('emailGoogle');
    google.accounts.id.revoke(usuario, () => {
      this.ngZone.run(() => {
        localStorage.removeItem('emailGoogle');
        this.router.navigateByUrl('/login');
      });
    });
  }
}
