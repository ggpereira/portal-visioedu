import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IMediasEnem } from '../shared/models/enem';

@Injectable({
  providedIn: 'root'
})
export class EnemService {

  constructor(private httpClient: HttpClient) {}

  getMediaCidade(nomeMunicipio: string, nomeEstado: string): Observable<IMediasEnem> {
      const params = new HttpParams()
          .set('estado', nomeEstado)
          .set('municipio', nomeMunicipio);
      return this.httpClient.get<any>(environment.host + 'medias/municipios', {params})
        .pipe(
          map((response) => {
              return response.data[0];
          })
        );
  }
}
