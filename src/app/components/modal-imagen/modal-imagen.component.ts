import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir!: File;
  public imgTem: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void { }

  cerrarModal() {
    this.imgTem = null;
    this.modalImagenService.cerrarModal();
  }

  actualizarImagen(event: any) {
    let image = event.target.files[0];
    this.imagenSubir = image;

    if (!image) {
      return (this.imgTem = null);
    }

    const reader = new FileReader();
    const base64 = reader.readAsDataURL(image);

    reader.onloadend = () => {
      this.imgTem = reader.result;
    };
    return true;
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((error) => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }
}
