import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';

import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SobreComponent } from './sobre/sobre.component';
import { ChartsComponent } from './charts/charts.component';
import { fakeBackendProvider } from './shared/mocks/mock-interceptor';
import { environment } from 'src/environments/environment';
import { EscolaService } from './services/escola.service';
import { StatisticsModule } from './statistics/statistics.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreComponent,
    ChartsComponent
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
    ReactiveFormsModule
  ],
  providers: [ environment.mocking ? fakeBackendProvider : [], EscolaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
