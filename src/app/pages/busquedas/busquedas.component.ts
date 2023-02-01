import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';
import { Medicos } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [],
})
export class BusquedasComponent implements OnInit {
  public usuario: Usuario[] = [];
  public medico: Medicos[] = [];
  public hospital: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.termino);
      this.busquedaGlobal(params.termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedaService.busquedaGlobal(termino).subscribe((response: any) => {
      console.log(response);
      this.usuario = response.usuarios;
      this.hospital = response.hospitales;
      this.medico = response.medicos;
    });
  }
}
