import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IEstatisticasEstado, IResponseEstatistica, IEstatisticasCidade } from '../shared/models/estatisticas';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  /*
    Retorna estatísticas agregadas por estado
  */
  getEstatisticasEstado(nome?: string): Observable<Array<IEstatisticasEstado>> {
    let params = new HttpParams();

    if (nome !== undefined) {
      params = params.append('estado', nome);
    }

    return this.http.get<IResponseEstatistica>(environment.host + 'estatisticas/estados', { params })
      .pipe(
         map((res: IResponseEstatistica) => {
          return res.data as Array<IEstatisticasEstado>;
        })
      );
  }


  /*
    Retorna estatísticas agregadas por cidade
  */
  getEstatisticasCidade(municipio?: string, estado?: string): Observable<Array<IEstatisticasCidade>> {
    let params = new HttpParams();

    if (municipio !== undefined) {
      params = params.append('municipio', municipio);
    }

    if (estado !== undefined) {
      params = params.append('estado', estado);
    }

    return this.http.get<IResponseEstatistica>(environment.host + 'estatisticas/municipios', { params })
      .pipe(
        map((res: IResponseEstatistica) => {
          return  res.data as Array<IEstatisticasCidade>;
        })
      );
  }


}
