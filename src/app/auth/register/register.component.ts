import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['1234567', Validators.required],
      password2: ['123456', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    } else {
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        (response) => {
          console.log('USUARIO CREADO', response);
          this.router.navigateByUrl('/');
        },
        (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const passUnoControl = formGroup.get(password);
      const passDosControl = formGroup.get(password2);

      if (passUnoControl?.value === passDosControl?.value) {
        passDosControl?.setErrors(null);
      } else {
        passDosControl?.setErrors({ noEsIgual: true });
      }
    };
  }

  aceptarTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
}
