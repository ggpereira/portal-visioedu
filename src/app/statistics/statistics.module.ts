import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics.component';
import { MaterialModule } from '../material-module';
import { ButtonComponent } from './button-home/button.component';


@NgModule({
  declarations: [ SearchComponent, StatisticsComponent, ButtonComponent ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class StatisticsModule { }
