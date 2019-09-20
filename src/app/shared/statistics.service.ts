import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEscolaStatistics} from './models/statisticsEscola';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getEscolas(): Observable<Array<IEscolaStatistics>> {
    return this.http.get<Array<IEscolaStatistics>>(environment.host + 'escolas/estatisticas');
  }
}
