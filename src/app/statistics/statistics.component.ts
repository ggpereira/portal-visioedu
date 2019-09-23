import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsService } from '../services/statistics.service';
import { IEstadoStatistics } from '../shared/models/statisticsEstado';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  titleChart = 'Teste';
  type = 'BarChart';

  dataEscolasStatistics: Array<IEstadoStatistics>;

  myData: Array<any>;
  constructor(private stastisticService: StatisticsService) { }

  ngOnInit() {
    this.stastisticService.getStats().subscribe((data) => {
      this.myData = data;
    });
  }
}
