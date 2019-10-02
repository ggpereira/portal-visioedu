import { Component, OnInit } from '@angular/core';
import { EnemService } from '../services/enem.service';
import { StatisticsService } from '../services/statistics.service';
import { ILocation } from '../shared/models/location';
import { ChartConf } from '../charts/charts.component';
import { IMediasEnem } from '../shared/models/enem';
import { LocationService } from '../services/location.service';
import { IEstatisticasCidade } from '../shared/models/estatisticas';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    private locationService: LocationService) { }

  ngOnInit() {
    console.log('ENVIRONMENT');
    this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.getMediaCidade(this.location.city, this.location.region);
      this.getEstatisticasCidade(this.location.city, this.location.region);
    });
  }


  getMediaCidade(cidade: string, estado: string) {
    this.enemService.getMediaCidade(cidade, estado).subscribe((dataMedias: Array<IMediasEnem>) => {
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
        }
      };

      this.cardSubHeader = this.location.city;
    });
  }

  getEstatisticasCidade(cidade: string, estado: string) {
    this.statisticsService.getEstatisticasCidade(cidade, estado).subscribe((estatisticasCidade: Array<IEstatisticasCidade>) => {
      this.statsCidade = estatisticasCidade[0];
      this.pieChartConfAguaInexistente = {
        chartLabels: [['Possui'], ['Não possui']],
        chartPlugins: [],
        legend: true,
        chartData: [{
          data: [(1 - this.statsCidade.porcentagemAguaInexistente) * 100, this.statsCidade.porcentagemAguaInexistente * 100],
        }],
        chartOptions: {
          responsive: true,
        }
      };

      this.pieChartConfEnergia = {
        chartLabels: [['Possui'], ['Não possui']],
        chartPlugins: [],
        legend: true,
        chartData: [{
          data: [(1 - this.statsCidade.porcentagemEnergiaInexistente) * 100, this.statsCidade.porcentagemEnergiaInexistente * 100],
        }],
        chartOptions: {
          responsive: true,
        }
      };

      this.pieChartConfInternet = {
        chartLabels: [['Possui acesso'], ['Não possui acesso']],
        chartPlugins: [],
        legend: true,
        chartData: [{
          data: [this.statsCidade.porcentagemInternet * 100 , (1 - this.statsCidade.porcentagemInternet) * 100],
        }],
        chartOptions: {
          responsive: true,
        }
      };

      this.pieChartConfEsgoto = {
        chartLabels: [['Possui'], ['Não possui']],
        chartPlugins: [],
        legend: true,
        chartData: [{
          data: [(1 - this.statsCidade.porcentagemEsgotoInexistente) * 100, this.statsCidade.porcentagemEsgotoInexistente]
        }],
        chartOptions: {
          responsive: true
        }
      };

      this.cardSubHeader = this.location.city;
    });
  }

  getChartColors(): any {
    const customColors = [{ backgroundColor: ['#9370DB', '#E6E6FA', '#9975B9', '#BFA8D3'] }];
    return customColors;
  }

}
