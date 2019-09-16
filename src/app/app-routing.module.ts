import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
