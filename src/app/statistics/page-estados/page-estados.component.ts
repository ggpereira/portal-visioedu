import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/shared/models/location';
import { ChartsComponent, ChartConf } from 'src/app/charts/charts.component';
import { LocationService } from 'src/app/services/location.service';
import { EnemService } from 'src/app/services/enem.service';
import { IMediasEnem } from 'src/app/shared/models/enem';
import { StatisticsService } from 'src/app/services/statistics.service';
import { IEstatisticasEstado } from 'src/app/shared/models/estatisticas';

@Component({
  selector: 'app-page-estados',
  templateUrl: './page-estados.component.html',
  styleUrls: ['./page-estados.component.scss']
})
export class PageEstadosComponent implements OnInit {
  chartType: string;
  titulo: string;
  location: ILocation;
  barChartConf: ChartConf;
  pieChartsConf: Array<ChartConf>;
  mediasEnemData: IMediasEnem;
  estatisticas: IEstatisticasEstado;

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
    private locationService: LocationService,
    private enemService: EnemService,
    private estatisticasService: StatisticsService
  ) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.getMediasEstado(this.location.region);
      this.getDadosInfraestruturaEscolas(this.location.region);
    });
  }

  getDadosInfraestruturaEscolas(nomeEstado: string) {
    this.estatisticasService.getEstatisticasEstado(nomeEstado).subscribe((data: Array<IEstatisticasEstado>) => {
      this.estatisticas = data[0];
      this.pieChartsConf = [
        {
          chartLabels: [['Possui'], ['Não possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [(1 - this.estatisticas.porcentagemAguaInexistente) * 100, this.estatisticas.porcentagemAguaInexistente * 100],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Escolas que possuem água',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui'], ['Não possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [(1 - this.estatisticas.porcentagemEnergiaInexistente) * 100, this.estatisticas.porcentagemEnergiaInexistente * 100],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Escolas que possuem energia',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui acesso'], ['Não possui acesso']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [this.estatisticas.porcentagemInternet * 100, (1 - this.estatisticas.porcentagemInternet) * 100],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Escolas que possuem internet',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui'], ['Não possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [(1 - this.estatisticas.porcentagemEsgotoInexistente) * 100, this.estatisticas.porcentagemEsgotoInexistente]
          }],
          chartOptions: {
            responsive: true
          },
          chartType: 'pie',
          title: 'Escolas que possuem esgoto',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui'], ['Não possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [
              this.estatisticas.porcentagemLaboratorioInformatica * 100,
              (1 - this.estatisticas.porcentagemLaboratorioInformatica) * 100
            ],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Laboratório Informática',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui'], ['Não possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [
              this.estatisticas.porcentagemSalaAtendimentoEspecial * 100,
              (1 - this.estatisticas.porcentagemSalaAtendimentoEspecial) * 100
            ],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Sala para atendimento Especial',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui'], ['Não possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [
              this.estatisticas.porcentagemBiblioteca * 100,
              (1 - this.estatisticas.porcentagemBiblioteca) * 100
            ],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Escolas com Biblioteca',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Recicla'], ['Não Recicla']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [
              this.estatisticas.porcentagemLixoRecicla * 100,
              (1 - this.estatisticas.porcentagemLixoRecicla) * 100
            ],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Escolas que reciclam lixo',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        },
        {
          chartLabels: [['Possui'], ['Não Possui']],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [
              this.estatisticas.porcentagemLaboratorioCiencias * 100,
              (1 - this.estatisticas.porcentagemLaboratorioCiencias) * 100
            ],
          }],
          chartOptions: {
            responsive: true,
          },
          chartType: 'pie',
          title: 'Laboratório de Ciências',
          subHeader: nomeEstado,
          iconName: 'pie_chart'
        }
      ];
    });
  }

  getMediasEstado(nomeEstado: string) {
    this.enemService.getMediasEstados(nomeEstado).subscribe((mediasData: Array<IMediasEnem>) => {
      this.mediasEnemData = mediasData[0];

      this.barChartConf = {
        title: 'Médias Enem',
        iconName: 'bar_chart',
        chartType: 'bar',
        chartLabels: ['Humanas', 'Naturais', 'Matemática', 'Redação', 'Linguagens', 'Geral'],
        chartPlugins: [],
        legend: true,
        chartData: [{
          data: [
            this.mediasEnemData.mediaCh,
            this.mediasEnemData.mediaCn,
            this.mediasEnemData.mediaMat,
            this.mediasEnemData.mediaRedacao,
            this.mediasEnemData.mediaLc,
            this.mediasEnemData.mediaGeral
          ],
          label: 'Médias',
        }],
        chartOptions: {
          responsive: true
        },
        subHeader: nomeEstado
      };
    });
  }

  selectedStateValue(state) {
    this.getMediasEstado(state);
    this.getDadosInfraestruturaEscolas(state);
  }

}
