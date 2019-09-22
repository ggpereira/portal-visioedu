import { Component, OnInit} from '@angular/core';

import { ILocation } from '../shared/models/location';
import { LocationService } from '../services/location.service';
import { ɵBrowserAnimationBuilder } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  local: ILocation;
  showLegend = false;
  colorScheme = {
    domain: ['#65DD2E', '#1652E7', '#FE7103', '#F90522', '#7D05FC']
  };

  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  
  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "Brasil",
      "value":100000,
    },
  ];

  constructor(private locationService: LocationService){}

  ngOnInit() {
    this.locationService.getLocation().subscribe((dataLocal: ILocation) => {
      this.local = dataLocal;
    });
  }
}


