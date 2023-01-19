import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { NgZone } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(): void {
    console.log({ esto: this });
    google.accounts.id.initialize({
      client_id:
        '979336605425-8h0cloi8vg05dggkfq4lqebvhough1pm.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      theme: 'outline',
      size: 'large',
    });
  }

  handleCredentialResponse(response: any) {
    console.log('encoded jwt ', response.credential);
    this.usuarioService
      .loginGoogle(response.credential)
      .subscribe((response) => {
        console.log(response);
        localStorage.setItem('emailGoogle', response.email);
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      });
  }

  login(): void {
    this.usuarioService.login(this.loginForm.value).subscribe(
      (response) => {
        if (this.loginForm.get('remember')?.value === true) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        console.log(response);
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      },
      (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }
}
