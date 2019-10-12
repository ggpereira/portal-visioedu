import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  myData: Array<any>;
  constructor(private stastisticService: StatisticsService) { }
  ngOnInit() {}

  goViewEscolas() {
    console.log('ir para view escolas');
  }

  goViewEstados() {
    console.log('ir para view estados');
  }

  goViewCidades() {
    console.log('ir para view cidades');
  }

}
