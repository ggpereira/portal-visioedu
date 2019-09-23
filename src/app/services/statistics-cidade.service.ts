import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICidadeStatistics } from '../shared/models/statisticsCidade';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsCidadeService {

  constructor(private httpClient: HttpClient) {}

  getStatsCidade(nomeMunicipio: string, nomeEstado: string): Observable<ICidadeStatistics> {
      const params = new HttpParams()
          .set('estado', nomeEstado)
          .set('municipio', nomeMunicipio);
      return this.httpClient.get<any>(environment.host + 'estatisticas/municipios', {params})
        .pipe(
          map((response) => {
              return response.data[0];
          })
        );
  }
}
