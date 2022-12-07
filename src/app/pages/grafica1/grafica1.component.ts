import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  label1: string[] = ['Octubre', 'Noviembre', 'Diciembre'];
  data1: number[] = [20, 589, 323]
  labels2: string[] = ['Nada controlados', 'Más o menos controlados', 'Totalmente controlados'];
  data2: number[] = [405, 109, 200];
  labels3: string[] = ['Análisis de equidad interna', 'Análisis de mercado', 'Diseño de la PVE'];
  data3: number[] = [42, 34, 28]

}
