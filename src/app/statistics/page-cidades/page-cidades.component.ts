import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { IEstatisticasCidade } from '../../shared/models/estatisticas';
import { StatisticsService } from 'src/app/services/statistics.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { ILocation } from 'src/app/shared/models/location';
import { EnemService } from 'src/app/services/enem.service';
import { IMediasEnem } from 'src/app/shared/models/enem';
import { ChartConf } from 'src/app/charts/charts.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-page-cidades',
  templateUrl: './page-cidades.component.html',
  styleUrls: ['./page-cidades.component.scss']
})
export class PageCidadesComponent implements OnInit, OnDestroy {
  data: IEstatisticasCidade[] = [];
  myControl: FormControl = new FormControl();
  currentStateName: string;
  mediasEnem: IMediasEnem;
  barChartConf: ChartConf;
  pieChartsConf: Array<ChartConf>;
  estatisticas: IEstatisticasCidade;

  // subscriptions
  estatisticas$: Subscription;
  mediasEnem$: Subscription;
  data$: Subscription;
  location$: Subscription;
  formControl$: Subscription;

  isLoadingCidade = true;
  isLoadingMedias = true;

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

  location: ILocation;
  constructor(
    private estatisticasService: StatisticsService,
    private locationService: LocationService,
    private enemService: EnemService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.location$ = this.locationService.getLocation().subscribe((data: ILocation) => {
      this.location = data;

      this.currentStateName = this.location.region;

      this.getMediasCidade(this.location.city, this.location.region);
      this.getEstatisticasCidade(this.location.city);

      this.formControl$ = this.myControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(myControl => {
          // tslint:disable-next-line: max-line-length
          this.estatisticasService.getEstatisticasCidade(myControl, this.currentStateName).subscribe((response: Array<IEstatisticasCidade>) => {
            this.data = response;
          });
        });
    });

  }

  ngOnDestroy() {
    this.destroySubscription(this.location$);
    this.destroySubscription(this.estatisticas$);
    this.destroySubscription(this.mediasEnem$);
    this.destroySubscription(this.formControl$);
  }

  getEstatisticasCidade(municipio: string) {
    // tslint:disable-next-line: max-line-length
    this.estatisticas$ = this.estatisticasService.getEstatisticasCidade(municipio, this.currentStateName).subscribe((response: Array<IEstatisticasCidade>) => {
      this.isLoadingCidade = false;
      if (response.length <= 0) {
        return;
      }

      this.estatisticas = response[0];
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
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
          subHeader: municipio,
          iconName: 'pie_chart'
        }
      ];
    },(error) => {
      this.isLoadingCidade = false;
      this.openSnackBar('Não foi possível carregar as informações. Tente novamente mais tarde.', 'Ok');
    });
  }

  getMediasCidade(municipio: string, estado: string) {

    this.mediasEnem$ = this.enemService.getMediasCidades(municipio, estado).subscribe((dadosMedias: Array<IMediasEnem>) => {
      this.isLoadingMedias = false;
      if (dadosMedias.length <= 0) {
        return;
      }
      this.mediasEnem = dadosMedias[0];
      this.barChartConf = {
        title: 'Médias Enem',
        iconName: 'bar_chart',
        chartType: 'bar',
        chartLabels: ['Humanas', 'Naturais', 'Matemática', 'Redação', 'Linguagens', 'Geral'],
        chartPlugins: [],
        legend: true,
        chartData: [{
          data: [
            this.mediasEnem.mediaCh,
            this.mediasEnem.mediaCn,
            this.mediasEnem.mediaMat,
            this.mediasEnem.mediaRedacao,
            this.mediasEnem.mediaLc,
            this.mediasEnem.mediaGeral
          ],
          label: 'Médias',
        }],
        chartOptions: {
          responsive: true
        },
        subHeader: municipio
      };
    },(error) => {
        this.isLoadingMedias = false;
        this.openSnackBar('Não foi possível carregar as informações. Tente novamente mais tarde.', 'Ok');
      });
  }

  onSelection(value) {
    this.getMediasCidade(value.source.value, this.currentStateName);
    this.getEstatisticasCidade(value.source.value);
  }

  setCurrentStateValue(value) {
    this.currentStateName = value.estado;
    this.myControl.reset();
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
