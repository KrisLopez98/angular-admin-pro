import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  obtenerHospitales() {
    const url = `${base_url}hospitales`;
    return this.http.get<Hospital[]>(url, this.headers).pipe(
      map((resp: any) => {
        console.log(resp.hospitales);
        return resp;
      })
    );
  }

  crearHospital(nombre: string) {
    const url = `${base_url}hospitales`;
    return this.http.post<Hospital[]>(url, { nombre }, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${base_url}hospitales/${_id}`;
    return this.http.put<Hospital[]>(url, { nombre }, this.headers);
  }

  eliminarHospital(_id: string) {
    const url = `${base_url}hospitales/${_id}`;
    return this.http.delete<Hospital[]>(url, this.headers);
  }
}
