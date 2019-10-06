import { Component, OnInit } from '@angular/core';
import { ILocation } from 'selenium-webdriver';
import { ChartsComponent, ChartConf } from 'src/app/charts/charts.component';

@Component({
  selector: 'app-page-estados',
  templateUrl: './page-estados.component.html',
  styleUrls: ['./page-estados.component.scss']
})
export class PageEstadosComponent implements OnInit {
  chartType: string;
  titulo: string;
  location: ILocation;
  pieChartConf: Array<ChartConf>;
  barChartConf: ChartConf;

  constructor() { }

  ngOnInit() {
  }

  selectedStateValue(state) {
    console.log('Estado selecionado:', state);
  }

}
