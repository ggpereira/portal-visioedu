import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IMediasEnem, IResponseMediasEnem } from '../shared/models/enem';

@Injectable({
  providedIn: 'root'
})
export class EnemService {

  constructor(private httpClient: HttpClient) {}

  /*
    Retorna médias do enem agregadas por cidade
  */
  getMediaCidade(nomeMunicipio: string, nomeEstado: string): Observable<Array<IMediasEnem>> {
    let params = new HttpParams();

    console.log('parâmetros recebidos:', nomeMunicipio, nomeEstado);

    if (nomeMunicipio !== undefined) {
      console.log('Criando filtro para municipio');
      params = params.append('municipio', nomeMunicipio);
    }

    if (nomeEstado !== undefined) {
      console.log('Criando filtro para estado');
      params = params.append('estado', nomeEstado);
    }

    console.log(params);

    return this.httpClient.get<IResponseMediasEnem>(environment.host + 'medias/municipios', {params})
      .pipe(
        map((response: IResponseMediasEnem) => {
            return response.data;
        })
      );
  }
}
