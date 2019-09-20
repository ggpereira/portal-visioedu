import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IDataEscola } from './models/escola';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  constructor(private http: HttpClient) { }

  getEscolas(perPage?: number, page?: number, filter?: any): Observable<IDataEscola>{

    const params = new HttpParams()
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    return this.http.get<IDataEscola>(environment.host + 'escolas', { params });
  }

}
