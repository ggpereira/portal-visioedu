import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEscolaStatistics} from '../shared/models/statisticsEscola';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  // getEscolas(): Observable<Array<IEscolaStatistics>> {
  //   return this.http.get<Array<IEscolaStatistics>>(environment.host + 'escolas/estatisticas');
  // }

  getEscolas(): Observable<Array<any>> {
    return this.http.get<Array<IEscolaStatistics>>(environment.host + 'estatisticas/escolas').pipe(
      map((res: IEscolaStatistics[]) => {
        const estatisticas = [];

        res.map((data: IEscolaStatistics) => {
           estatisticas.push([data.estado, data.codigo]);
         });

        return estatisticas;
      })
    );
  }
}
