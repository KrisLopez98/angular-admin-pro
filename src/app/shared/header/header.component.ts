import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  usuario!: Usuario;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario!;
  }

  logout(): void {
    this.usuarioService.logout();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.router.navigateByUrl('/dashboard');
      console.log('----> redirect to', termino);
    }
    console.log('----> termino de busqueda', termino);
    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`)
  }
}
