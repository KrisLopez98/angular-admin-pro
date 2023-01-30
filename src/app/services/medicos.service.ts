import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicos } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  obtenerMedicos() {
    const url = `${base_url}medicos`;
    return this.http.get(url, this.headers);
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}medicos/${id}`;
    return this.http.get(url, this.headers);
  }

  crearMedico(medico: { nombre: string; hospital: string }) {
    const url = `${base_url}medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedico(medico: any) {
    const url = `${base_url}medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  eliminarMedico(medico: Medicos) {
    const url = `${base_url}medicos/${medico._id}`;
    return this.http.delete(url, this.headers);
  }
}
