import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { MaterialModule } from '../material-module';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule
  ],
  exports: [
    ChartsComponent
  ]
})
export class ChartsComponentModule { }
