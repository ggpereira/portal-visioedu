import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { PageEstadosComponent } from './statistics/page-estados/page-estados.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'estatisticas',
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  { path: 'sobre', component: SobreComponent},
  { path: 'compare', component: CompareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
