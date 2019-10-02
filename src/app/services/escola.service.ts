import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IResponseEscola } from '../shared/models/escola';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  constructor(private http: HttpClient) { }
  /*
    Retorna dados de escolas
  */

  getEscolas(perPage?: number, page?: number, filter?: any): Observable<IResponseEscola> {
    let params = new HttpParams();

    if (perPage !== undefined) {
      params = params.append('per_page', perPage.toString());
    }

    if (page !== undefined) {
      params = params.append('page', page.toString());
    }

    return this.http.get<IResponseEscola>(environment.host + 'escolas', { params });
  }

}
