import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  myData: Array<any>;
  constructor(private stastisticService: StatisticsService) { }

  ngOnInit() {
    this.stastisticService.getEscolas().subscribe((data) => {
      this.myData = data;
    });
  }
}
