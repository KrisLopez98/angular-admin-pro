import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from '../../environments/environment.prod';
import { Hospital } from '../models/hospital.model';
import { Medicos } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
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
  }

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medicos[] {
    return resultados;
  }

  buscarTermino(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
            break;
          case 'hospitales':
            return this.transformarHospitales(resp.resultados);
            break;
          case 'medicos':
            return this.transformarMedicos(resp.resultados);
            break;
          default:
            return [];
        }
      })
    );
  }
}
