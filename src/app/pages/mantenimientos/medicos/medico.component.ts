import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { MedicosService } from '../../../services/medicos.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: any;
  public medicoSeleccionado: any;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (hospital) => hospital._id === hospitalId
      );
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'nuevo') {
        console.log(id);
        this.cargarMedico(id);
      }
    });

    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hospitalService.obtenerHospitales().subscribe((response) => {
      this.hospitales = response.hospitales;
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
    .pipe(
      delay(100)
    )
    .subscribe((response: any) => {
      if (!response.medico) {
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }
      const {
        nombre,
        hospital: { _id },
      } = response.medico;
      this.medicoSeleccionado = response.medico;
      this.medicoForm.setValue({ nombre, hospital: _id });
    });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      // ACTUALIZAR
      const dataMedico = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id!,
      };
      console.log('DATA MEDICO --->', dataMedico);
      this.medicoService.actualizarMedico(dataMedico).subscribe((response) => {
        console.log(response);
        Swal.fire(
          'Actualizado',
          `${nombre} ha sido actualizado correctamente`,
          'success'
        );
      });
    } else {
      // CREAR
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((response: any) => {
          Swal.fire(
            'Creado',
            `${nombre} ha sido creado correctamente`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${response.medico._id}`);
        });
    }
  }
}
