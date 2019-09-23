import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEstadoStatistics } from '../shared/models/statisticsEstado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  // getEscolas(): Observable<Array<IEscolaStatistics>> {
  //   return this.http.get<Array<IEscolaStatistics>>(environment.host + 'escolas/estatisticas');
  // }

  getStats(): Observable<Array<any>> {
    return this.http.get<Array<IEstadoStatistics>>(environment.host + 'estatisticas/estados').pipe(
      map((res: IEstadoStatistics[]) => {
        const estatisticas = [];

        res.map((data: IEstadoStatistics) => {
           estatisticas.push([data.estado, data.codigo]);
         });

        return estatisticas;
      })
    );
  }
}
