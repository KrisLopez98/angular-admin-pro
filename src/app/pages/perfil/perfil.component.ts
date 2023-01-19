import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario?: Usuario;
  public imagenSubir!: File;
  public imgTem: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService
      .actualizarPefil(this.perfilForm.value)
      .subscribe((response) => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;
        console.log(response);
        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
      }, (error) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error')
      });
  }

  actualizarImagen(event: any) {
    let image = event.target.files[0];
    this.imagenSubir = image;

    if (!image) { return this.imgTem = null}

    const reader = new FileReader();
    const base64 = reader.readAsDataURL(image);

    reader.onloadend = () => {
      this.imgTem = reader.result;
    }
    return true
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(
      this.imagenSubir,
      'usuarios',
      this.usuario!.uid!
    ).then(img => {
      this.usuario!.img! = img;
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
    }).catch( error => {
      Swal.fire('Error', error.error.msg, 'error');
    })
  }
}
