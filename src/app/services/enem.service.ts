import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IMediasEnem, IResponseMediasEnem, IResponseDadosEnem } from '../shared/models/enem';

@Injectable({
  providedIn: 'root'
})
export class EnemService {

  constructor(private httpClient: HttpClient) {}

  /*
    Retorna médias do enem agregadas por cidade
  */
  getMediasCidades(nomeMunicipio?: string, nomeEstado?: string): Observable<Array<IMediasEnem>> {
    let params = new HttpParams();

    if (nomeMunicipio !== undefined) {
      params = params.append('municipio', nomeMunicipio);
    }

    if (nomeEstado !== undefined) {
      params = params.append('estado', nomeEstado);
    }

    return this.httpClient.get<IResponseMediasEnem>(environment.host + 'medias/municipios', {params})
      .pipe(
        map((response: IResponseMediasEnem) => {
            return response.data;
        })
      );
  }

  /*
    Retorna médias do enem agredadas por estado
  */
  getMediasEstados(nomeEstado?: string): Observable<Array<IMediasEnem>> {
    let params = new HttpParams();

    if (nomeEstado !== undefined) {
      params = params.append('estado', nomeEstado);
    }

    return this.httpClient.get<IResponseMediasEnem>(environment.host + 'medias/estados', { params })
      .pipe(
        map((response: IResponseMediasEnem) => {
          return response.data;
        })
      );
  }

  getMediaByCodEscola(codEscola: number): Observable<IMediasEnem> {
    return this.httpClient.get<IMediasEnem>(environment.host + `medias/escolas/${codEscola}`);
  }
}
