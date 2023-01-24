import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
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
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
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

  actualizarPefil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario!.role!,
    };
    return this.http.put(`${base_url}usuarios/${this.uid}`, data, this.headers);
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

  cargarUsuarios(desde: number = 0): Observable<CargarUsuario> {
    const url = `${base_url}usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((response) => {
        const usuarios = response.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: response.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarPefil(usuario: Usuario) {
    return this.http.put(
      `${base_url}usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
