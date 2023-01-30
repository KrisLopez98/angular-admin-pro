import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(200)
    ).subscribe((img) =>
      this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.obtenerHospitales().subscribe((resp) => {
      console.log('RESPUESTA COMPONENTE HOSPITALES ---> ', resp);
      this.cargando = false;
      this.hospitales = resp.hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService
      .actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe((response) => {
        console.log(response);
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService
      .eliminarHospital(hospital._id!)
      .subscribe((response) => {
        console.log(response);
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear un hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img
    );
  }

  buscarTermino(termino: string) {
    console.log(termino);
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    this.busquedaService.buscarTermino('hospitales', termino).subscribe(
      (response: any) => {
        console.log(response);
        this.hospitales = response;
      }
    )
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
