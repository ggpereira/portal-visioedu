import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILocation } from '../shared/models/location';
import { ICidade } from '../shared/models/cidade';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}
  /*
    Obtém a localização com base no provedor
  */
  getLocation(): Observable<ILocation> {
    return this.http.get<ILocation>(environment.apiLocation);
  }

  /*
    Obtém cidades
  */
  getCidades(nome?: string, uf?: string): Observable<Array<ICidade>> {
    let params = new HttpParams();

    if (nome !== undefined) {
      params = params.append('nome', nome);
    }

    if (uf !== undefined) {
      params = params.append('uf', uf);
    }

    return this.http.get<Array<ICidade>>(environment.host + 'municipios', { params });
  }

}
