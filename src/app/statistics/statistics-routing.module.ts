import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { PageEstadosComponent } from './page-estados/page-estados.component';
import { PageCidadesComponent } from './page-cidades/page-cidades.component';
import { PageEscolasComponent } from './page-escolas/page-escolas.component';

const routes: Routes = [
  {path: '', component: StatisticsComponent},
  { path: 'estados', component: PageEstadosComponent},
  { path: 'cidades', component: PageCidadesComponent},
  { path: 'escolas', component: PageEscolasComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
