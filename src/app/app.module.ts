import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { HomeComponent } from './home/home.component';

import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

import { SobreComponent } from './sobre/sobre.component';
import { fakeBackendProvider } from './shared/mocks/mock-interceptor';
import { environment } from 'src/environments/environment';
import { EscolaService } from './services/escola.service';
import { StatisticsModule } from './statistics/statistics.module';
import { ChartsComponentModule } from './charts/charts.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    ChartsModule,
    StatisticsModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsComponentModule
  ],
  providers: [ environment.mocking ? fakeBackendProvider : [], EscolaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
