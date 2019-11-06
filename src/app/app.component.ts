import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './services/location.service';
import { ILocation } from './shared/models/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'visioEdu-Portal';

  isMenuOpen = true;
  contentMargin = 240;

  constructor() { }

  ngOnInit() {}

  onToolbarToogle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
}
