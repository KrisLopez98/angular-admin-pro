import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }


  ngOnInit(): void {
    this.obtenerUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(200)
    ).subscribe((img) =>
      this.obtenerUsuarios()
    );
  }

  obtenerUsuarios(): void {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.obtenerUsuarios();
  }

  buscarTermino(termino: string): any {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    this.busquedaService
      .buscarTermino('usuarios', termino)
      .subscribe((response: any) => {
        this.usuarios = response;
      });
  }

  eliminarUsuario(usuario: Usuario): any {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede eliminarse así mismo', 'error');
    }
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Esta a punto de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminalo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          Swal.fire(
            'Usuario eliminado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
          this.obtenerUsuarios();
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    console.log(usuario);
    this.usuarioService.guardarPefil(usuario).subscribe((response) => {
      console.log(response);
    });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
