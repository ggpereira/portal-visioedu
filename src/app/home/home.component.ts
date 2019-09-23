import { Component, OnInit} from '@angular/core';

import { ILocation } from '../shared/models/location';
import { LocationService } from '../services/location.service';
import { EnemService } from '../services/enem.service';
import { IMediasCidade } from '../shared/models/mediasEnem';


interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  local: ILocation;
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

  constructor(private locationService: LocationService, private enemService: EnemService) {}

  ngOnInit() {
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

  onSelect(event) {
    console.log('click');
  }
}


