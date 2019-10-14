import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { HomeComponent } from './home/home.component';

import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SobreComponent } from './sobre/sobre.component';
import { fakeBackendProvider } from './shared/mocks/mock-interceptor';
import { environment } from 'src/environments/environment';
import { EscolaService } from './services/escola.service';
import { StatisticsModule } from './statistics/statistics.module';
import { ChartsComponentModule } from './charts/charts.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompareComponent } from './compare/compare.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreComponent,
    CompareComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    StatisticsModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsComponentModule,
    FlexLayoutModule
  ],
  providers: [ environment.mocking ? fakeBackendProvider : [], EscolaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
