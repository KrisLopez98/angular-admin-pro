import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medicos } from '../../../models/medico.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { MedicosService } from '../../../services/medicos.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medicos[] = [];
  private imgSubs!: Subscription;

  constructor(
    private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.obtenerMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe((resp) => this.obtenerMedicos());
  }

  obtenerMedicos(): void {
    this.cargando = true;
    this.medicosService.obtenerMedicos().subscribe((resp: any) => {
      this.cargando = false;
      this.medicos = resp.medicos;
    });
  }

  buscarTermino(termino: string) {
    if (termino.length === 0) {
      return this.obtenerMedicos();
    }

    this.busquedasService
      .buscarTermino('medicos', termino)
      .subscribe((response: any) => {
        console.log(response);
        this.medicos = response;
      });
  }

  eliminarMedico(medico: Medicos) {
    console.log(medico);
    Swal.fire({
      title: '¿Eliminar médico?',
      text: `Esta a punto de eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, deseo eliminarlo',
    }).then((result) => {
      this.medicosService.eliminarMedico(medico).subscribe((resp) => {
        console.log(resp);
        this.obtenerMedicos();
        Swal.fire(
          'Médico eliminado',
          `${medico.nombre} fue eliminado correctamente`,
          'success'
        );
      });
    });
  }

  abrirModal(medico: Medicos) {
    console.log(medico);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
