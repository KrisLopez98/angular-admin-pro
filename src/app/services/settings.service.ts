import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const colorTheme = localStorage.getItem('color') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', colorTheme);
  }

  changeColor(color: string): void {
    const url = `./assets/css/colors/${color}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('color', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');
    links?.forEach(element => {
      // Remueve la clase working que es la flecha ✅
      element.classList.remove('working');
      // constante para conocer cual es el tema o color del boton
      const btnTheme = element.getAttribute('data-theme');
      // constante que nos ayuda a construir la url del tema o color
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      // Extraer el valor del href
      const currentTheme = this.linkTheme?.getAttribute('href');
      // Se realiza la validación del btnThemeUrl(construccion de la url) con el currentTheme(valor actual del tema)
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    })
  }
}
