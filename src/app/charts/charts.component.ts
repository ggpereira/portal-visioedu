import { Component, OnInit, Input } from '@angular/core';

import { CubejsClient } from '@cubejs-client/ngx';
import { ILocation } from '../shared/models/location';
import { IEstadoStatistics } from '../shared/models/statisticsEstado';
import { ICidadeStatistics } from '../shared/models/statisticsCidade';
import { LocationService } from '../services/location.service';
import { EnemService } from '../services/enem.service';
import { IMediasCidade } from '../shared/models/mediasEnem';
import { Subject } from 'rxjs';
import { StatisticsCidadeService } from '../services/statistics-cidade.service';


interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() chartType: string;
  @Input() titulo: string;
  @Input() query: string;

  local: ILocation;
  statsCidade: ICidadeStatistics;
  dataMediasCidade: IMediasCidade;
  chartData: ChartData[];
  cardSubHeader: string;


  trimLabels = false;
  showLegend = false;
  colorScheme = {
    domain: ['#65DD2E', '#1652E7', '#FE7103', '#F90522', '#7D05FC']
  };

  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  private querySubject;


  constructor(private locationService: LocationService,
              private statisticsCidadeService: StatisticsCidadeService, private enemService: EnemService) { }


  ngOnInit() {
    this.querySubject = new Subject();
    this.resultChanged();
    this.querySubject.next(this.query);
  }

  resultChanged() {
    if (this.query === 'mediasQuery' && this.chartType === 'pie') {
      this.mediasQuery();
    } else if (this.query === 'statsQuery' && this.chartType === 'bar') {
      this.statsQuery();
    }
  }

  mediasQuery() {
    this.locationService.getLocation().subscribe((dataLocal: ILocation) => {
      this.local = dataLocal;

      this.enemService.getMediaCidade(this.local.city, this.local.regionName).subscribe((dataMedias: IMediasCidade) => {
        this.dataMediasCidade = dataMedias;
        this.chartData = [
          {
            name: 'Ciências Humanas',
            value: this.dataMediasCidade.mediaCh,
          },
          {
            name: 'Matemática',
            value: this.dataMediasCidade.mediaMat,
          },
          {
            name: 'Ciências Naturais',
            value: this.dataMediasCidade.mediaCn
          },
          {
            name: 'Linguagens',
            value: this.dataMediasCidade.mediaLc
          },
          {
            name: 'Redação',
            value: this.dataMediasCidade.mediaRedacao
          }
        ];

        this.cardSubHeader = this.local.city;
      });

    });
  }

  statsQuery() {
    this.locationService.getLocation().subscribe((dataLocal: ILocation) => {
      this.local = dataLocal;

      this.statisticsCidadeService.getStatsCidade(this.local.city, this.local.regionName).subscribe((statsCidade: ICidadeStatistics) => {
        this.statsCidade = statsCidade;

        this.chartData = [
          {
            name: 'Escolas com Água',
            value: 100 - (this.statsCidade.porcentagemAguaInexistente * 100)
          },
          {
            name: 'Escolas com Esgoto',
            value: 100 - (this.statsCidade.porcentagemEsgotoInexistente * 100)
          },
          {
            name: 'Escolas com Energia',
            value: 100 - (this.statsCidade.porcentagemEnergiaInexistente * 100)
          },
          {
            name: 'Escolas com Coleta Periodica',
            value: this.statsCidade.porcentagemLixoColetaPeriodica * 100
          },
          {
            name: 'Escolas com Biblioteca',
            value: this.statsCidade.porcentagemBiblioteca * 100
          },
          {
            name: 'Escolas com Internet',
            value: this.statsCidade.porcentagemInternet * 100
          }
        ];
        this.cardSubHeader = this.local.city;
      });
    });
  }

  onSelect(event) {
    console.log('click');
  }
}
