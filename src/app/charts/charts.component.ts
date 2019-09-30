import { Component, OnInit, Input } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export interface ChartConf {
  chartLabels: Label[];
  legend: boolean;
  chartPlugins: any;
  chartData: ChartDataSets[];
  chartOptions: ChartOptions;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() chartType: string;
  @Input() titulo: string;
  @Input() subHeader: string;
  @Input() chartConfig: ChartConf;
  @Input() iconName: string;
  @Input() colors: any;

  constructor() {}


  ngOnInit() {
  }

  onSelect(event) {
    console.log('click');
  }
}
