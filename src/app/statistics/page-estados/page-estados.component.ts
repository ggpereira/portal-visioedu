import { Component, OnInit } from '@angular/core';
import { ILocation } from 'selenium-webdriver';
import { ChartsComponent, ChartConf } from 'src/app/charts/charts.component';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-page-estados',
  templateUrl: './page-estados.component.html',
  styleUrls: ['./page-estados.component.scss']
})
export class PageEstadosComponent implements OnInit {
  chartType: string;
  titulo: string;
  location: ILocation;
  chartsConf: Array<ChartConf>;

  constructor(private locationService: LocationService) { }

  ngOnInit() {

  }

  selectedStateValue(state) {
    console.log('Estado selecionado:', state);
  }

}
