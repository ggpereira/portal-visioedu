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
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


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
  cardSubHeader: string;
  chartValues: number[];

  private querySubject;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[];


  constructor(private locationService: LocationService,
              private statisticsCidadeService: StatisticsCidadeService, private enemService: EnemService) { }


  ngOnInit() {
    this.querySubject = new Subject();
    this.resultChanged();
    this.querySubject.next(this.query);
  }

  resultChanged() {
    if (this.query === 'mediasQuery' && this.chartType === 'bar') {
      this.mediasQuery();
    } else if (this.query === 'statsQuery' && this.chartType === 'bar') {
      this.statsQuery();
    }
  }

  mediasQuery() {
    this.locationService.getLocation().subscribe((dataLocal: ILocation) => {
      this.local = dataLocal;
      console.log(this.local);
      this.enemService.getMediaCidade(this.local.city, this.local.region).subscribe((dataMedias: IMediasCidade) => {
        this.dataMediasCidade = dataMedias;
        this.barChartLabels = ['Humanas', 'Naturais', 'Matemática', 'Redação', 'Linguagens', 'Geral'];
        this.barChartPlugins = [];
        this.barChartType = 'bar';
        this.chartValues = [];
        this.chartValues.push(this.dataMediasCidade.mediaCh);
        this.chartValues.push(this.dataMediasCidade.mediaCn);
        this.chartValues.push(this.dataMediasCidade.mediaMat);
        this.chartValues.push(this.dataMediasCidade.mediaRedacao);
        this.chartValues.push(this.dataMediasCidade.mediaLc);
        this.chartValues.push(this.dataMediasCidade.mediaGeral);

        this.barChartData = [{
          data: this.chartValues,
          label: 'Médias'
        }];

        this.cardSubHeader = this.local.city;
      });

    });
  }

  statsQuery() {
    // this.locationService.getLocation().subscribe((dataLocal: ILocation) => {
    //   this.local = dataLocal;

    //   this.statisticsCidadeService.getStatsCidade(this.local.city, this.local.regionName).subscribe((statsCidade: ICidadeStatistics) => {
    //     this.statsCidade = statsCidade;

    //     this.chartData = [
    //       {
    //         name: 'Escolas com Água',
    //         value: 100 - (this.statsCidade.porcentagemAguaInexistente * 100)
    //       },
    //       {
    //         name: 'Escolas com Esgoto',
    //         value: 100 - (this.statsCidade.porcentagemEsgotoInexistente * 100)
    //       },
    //       {
    //         name: 'Escolas com Energia',
    //         value: 100 - (this.statsCidade.porcentagemEnergiaInexistente * 100)
    //       },
    //       {
    //         name: 'Escolas com Coleta Periodica',
    //         value: this.statsCidade.porcentagemLixoColetaPeriodica * 100
    //       },
    //       {
    //         name: 'Escolas com Biblioteca',
    //         value: this.statsCidade.porcentagemBiblioteca * 100
    //       },
    //       {
    //         name: 'Escolas com Internet',
    //         value: this.statsCidade.porcentagemInternet * 100
    //       }
    //     ];
    //     this.cardSubHeader = this.local.city;
    //   });
    // });
  }

  onSelect(event) {
    console.log('click');
  }
}
