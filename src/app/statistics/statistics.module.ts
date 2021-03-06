import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics.component';
import { MaterialModule } from '../material-module';
import { ButtonComponent } from './button-home/button.component';
import { PageEstadosComponent } from './page-estados/page-estados.component';
import { PageCidadesComponent } from './page-cidades/page-cidades.component';
import { PageEscolasComponent } from './page-escolas/page-escolas.component';
import { LocationService } from '../services/location.service';
import { ChartsComponent } from '../charts/charts.component';
import { AppModule } from '../app.module';
import { ChartsComponentModule } from '../charts/charts.module';
import { SearchComponent } from './page-estados/search/search.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ StatisticsComponent, ButtonComponent, PageEstadosComponent, PageCidadesComponent, PageEscolasComponent, SearchComponent ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatAutocompleteModule,
    ChartsComponentModule,
    FlexLayoutModule
  ],
  exports: [ SearchComponent ],
  providers: []
})
export class StatisticsModule { }
