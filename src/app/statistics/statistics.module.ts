import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { SearchComponent } from './page-estados/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics.component';
import { MaterialModule } from '../material-module';
import { ButtonComponent } from './button-home/button.component';
import { PageEstadosComponent } from './page-estados/page-estados.component';
import { PageCidadesComponent } from './page-cidades/page-cidades.component';
import { PageEscolasComponent } from './page-escolas/page-escolas.component';


@NgModule({
  declarations: [ SearchComponent, StatisticsComponent, ButtonComponent, PageEstadosComponent, PageCidadesComponent, PageEscolasComponent ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ]
})
export class StatisticsModule { }
