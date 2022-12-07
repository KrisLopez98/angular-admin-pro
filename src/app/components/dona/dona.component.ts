import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input() title = 'Sin titulo';
  @Input() labels: string[] = ['Label1', 'Label2', 'Label3'];
  @Input() data: number[] = [350, 450, 100]


  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ]

}
