import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // Existe una forma de renombrar un input y es la siguiente:
  // @Input('valor1') progreso: number = 80;
  @Input() progreso: number = 80;
  @Input() btnClass: string = 'btn btn-primary'
  // Emision de algo, funciona para disparar un evento
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    let nextValue: number = this.progreso + valor;
    if (nextValue >= 100) {
      this.valorSalida.emit(100);
      nextValue = 100;
    }

    if (nextValue <= 0) {
      this.valorSalida.emit(0);
      nextValue = 0;
    }

    if (nextValue <= 100 && nextValue >= 0) {
      this.progreso = nextValue;
      this.valorSalida.emit(nextValue);
    }
  }

  onChange(newValue: number) {
    console.log(newValue);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.valorSalida.emit(this.progreso);
  }

}
