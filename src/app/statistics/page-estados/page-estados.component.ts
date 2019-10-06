import { Component, OnInit } from '@angular/core';
import { ILocation } from 'src/app/shared/models/location';
import { ChartsComponent, ChartConf } from 'src/app/charts/charts.component';
import { LocationService } from 'src/app/services/location.service';
import { EnemService } from 'src/app/services/enem.service';
import { IMediasEnem } from 'src/app/shared/models/enem';

@Component({
  selector: 'app-page-estados',
  templateUrl: './page-estados.component.html',
  styleUrls: ['./page-estados.component.scss']
})
export class PageEstadosComponent implements OnInit {
  chartType: string;
  titulo: string;
  location: ILocation;
  chartsConf: Array<ChartConf>;
  mediasEnemData: IMediasEnem;

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

  constructor(private locationService: LocationService, private enemService: EnemService) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.getMediasEstado(this.location.region);
    });
  }

  getMediasEstado(nomeEstado: string) {
    this.enemService.getMediasEstados(nomeEstado).subscribe((mediasData: Array<IMediasEnem>) => {
      this.mediasEnemData = mediasData[0];
      this.chartsConf = [
        {
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
        }
      ];
    });
  }

  selectedStateValue(state) {
    console.log('Estado selecionado:', state);
    this.getMediasEstado(state);
  }

}
