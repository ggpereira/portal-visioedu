import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EnemService } from '../services/enem.service';
import { StatisticsService } from '../services/statistics.service';
import { ILocation } from '../shared/models/location';
import { ChartConf } from '../charts/charts.component';
import { IMediasEnem } from '../shared/models/enem';
import { LocationService } from '../services/location.service';
import { IEstatisticasCidade } from '../shared/models/estatisticas';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  chartType: string;
  titulo: string;

  location: ILocation;
  chartConf: ChartConf;
  statsCidade: IEstatisticasCidade;
  dataMediasCidade: IMediasEnem;
  chartValues: number[];
  cardSubHeader: string;
  pieChartConfAguaInexistente: ChartConf;
  pieChartConfInternet: ChartConf;
  pieChartConfEsgoto: ChartConf;
  pieChartConfEnergia: ChartConf;

  pieChartConf: Array<ChartConf>;
  isLoadingMedias = true;
  isLoadingCidade = true;

  // subscriptions
  statsCidade$: Subscription;
  location$: Subscription;
  dataMediasCidade$: Subscription;

  public colors = [
    {
      backgroundColor: [
        '#9932CC',
        '#9370DB',
        '#E6E6FA',
        '#9975B9',
        '#BFA8D3',
      ]
    }
  ];

  constructor(
    private enemService: EnemService,
    private statisticsService: StatisticsService,
    private locationService: LocationService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.location$ = this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.getMediaCidade(this.location.city, this.location.region);
      this.getEstatisticasCidade(this.location.city, this.location.region);
    });
  }

  ngOnDestroy() {
    this.destroySubscription(this.location$);
    this.destroySubscription(this.dataMediasCidade$);
    this.destroySubscription(this.statsCidade$);
  }


  getMediaCidade(cidade: string, estado: string) {
    this.dataMediasCidade$ = this.enemService.getMediasCidades(cidade, estado).subscribe(
      (dataMedias: Array<IMediasEnem>) => {
        this.isLoadingMedias = false;
        if (dataMedias.length <= 0) {
          return;
        }

        this.dataMediasCidade = dataMedias[0];
        this.chartType = 'bar';
        this.chartValues = [];
        this.chartValues.push(this.dataMediasCidade.mediaCh);
        this.chartValues.push(this.dataMediasCidade.mediaCn);
        this.chartValues.push(this.dataMediasCidade.mediaMat);
        this.chartValues.push(this.dataMediasCidade.mediaRedacao);
        this.chartValues.push(this.dataMediasCidade.mediaLc);
        this.chartValues.push(this.dataMediasCidade.mediaGeral);

        this.chartConf = {
          chartLabels: ['Humanas', 'Naturais', 'Matemática', 'Redação', 'Linguagens', 'Geral'],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: this.chartValues,
            label: 'Médias'
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: this.chartType,
          title: 'Médias Enem',
          subHeader: this.location.city,
          iconName: 'bar_chart'
        };

        this.cardSubHeader = this.location.city;
      },
      (error) => {
        this.isLoadingMedias = false;
        this.openSnackBar('Não foi possível carregar as informações. Tente novamente mais tarde.', 'Ok');
      }
    );
  }

  getEstatisticasCidade(cidade: string, estado: string) {
    // tslint:disable-next-line: max-line-length
    this.statsCidade$ = this.statisticsService.getEstatisticasCidade(cidade, estado).subscribe(
      (estatisticasCidade: Array<IEstatisticasCidade>) => {
        this.isLoadingCidade = false;
        if (estatisticasCidade.length <= 0) {
          return;
        }
        this.statsCidade = estatisticasCidade[0];
        this.pieChartConf = [
          {
            chartLabels: [['Possui'], ['Não possui']],
            chartPlugins: [],
            legend: true,
            chartData: [{
              data: [(1 - this.statsCidade.porcentagemAguaInexistente) * 100, this.statsCidade.porcentagemAguaInexistente * 100],
            }],
            chartOptions: {
              responsive: true,
            },
            chartType: 'pie',
            title: 'Escolas que possuem água',
            subHeader: this.location.city,
            iconName: 'pie_chart'
          },
          {
            chartLabels: [['Possui'], ['Não possui']],
            chartPlugins: [],
            legend: true,
            chartData: [{
              data: [(1 - this.statsCidade.porcentagemEnergiaInexistente) * 100, this.statsCidade.porcentagemEnergiaInexistente * 100],
            }],
            chartOptions: {
              responsive: true,
            },
            chartType: 'pie',
            title: 'Escolas que possuem energia',
            subHeader: this.location.city,
            iconName: 'pie_chart'
          },
          {
            chartLabels: [['Possui acesso'], ['Não possui acesso']],
            chartPlugins: [],
            legend: true,
            chartData: [{
              data: [this.statsCidade.porcentagemInternet * 100, (1 - this.statsCidade.porcentagemInternet) * 100],
            }],
            chartOptions: {
              responsive: true,
            },
            chartType: 'pie',
            title: 'Escolas que possuem internet',
            subHeader: this.location.city,
            iconName: 'pie_chart'
          }, {
            chartLabels: [['Possui'], ['Não possui']],
            chartPlugins: [],
            legend: true,
            chartData: [{
              data: [(1 - this.statsCidade.porcentagemEsgotoInexistente) * 100, this.statsCidade.porcentagemEsgotoInexistente]
            }],
            chartOptions: {
              responsive: true
            },
            chartType: 'pie',
            title: 'Escolas que possuem esgoto',
            subHeader: this.location.city,
            iconName: 'pie_chart'
        }];
      },
      (error) => {
        this.isLoadingCidade = false;
        this.openSnackBar('Não foi possível carregar as informações. Tente novamente mais tarde.', 'Ok');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  destroySubscription(s: Subscription) {
    if (s !== undefined) {
      s.unsubscribe();
    }
  }
}
