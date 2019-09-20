import { Component, OnInit } from '@angular/core';

import { StatisticsService } from '../shared/statistics.service';
import { IEscolaStatistics } from '../shared/models/statisticsEscola';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  titleChart = 'Teste';
  type = 'BarChart';

  dataEscolasStatistics: Array<IEscolaStatistics>;

  myData = [];

  constructor(private escolaService: StatisticsService) { }

  ngOnInit() {
    this.escolaService.getEscolas().subscribe((data) => {
      this.dataEscolasStatistics = data;
      this.dataEscolasStatistics.forEach((statistics) => {
        this.setData(statistics.estado, statistics.codigo);
      });
      console.log(this.myData);
    });
  }

  setData(estado, codigo) {
    this.myData.push([{estado:estado, codigo:codigo}]);
  }
}
