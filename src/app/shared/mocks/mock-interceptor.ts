import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { IMediasEnem } from '../models/enem';
import { ok } from 'assert';
import { IEstatisticasCidade } from '../models/estatisticas';



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.match(/medias\/municipios/) && method === 'GET':
                    return getMediasByMunicipio();
                case url.match(/estatisticas\/municipios/) && method === 'GET':
                    return getEstatisticasByMunicipio();
                case url.match(/geoip/) && method === 'GET':
                    return getLocation();
                default:
                    return next.handle(request);
            }
        }

        function getMediasByMunicipio() {
            const medias: IMediasEnem[] = [{
                codigo: 1,
                estado: 'Rio Grande do Sul',
                uf: 'RS',
                municipio: 'Santa Maria',
                mediaGeral: 567.8,
                mediaCn: 568.9,
                mediaCh: 598.5,
                mediaMat: 589.6,
                mediaLc: 623.2,
                mediaRedacao: 678.1,
            }];
            return ok({
                data: medias
            });
        }

        function getEstatisticasByMunicipio() {
            const estatisticas: IEstatisticasCidade[] = [{
                codigo: 1,
                municipio: 'Santa Maria',
                estado: 'Rio Grande do Sul',
                uf: 'RS',
                qtdEscolas: 87,
                porcentagemAguaFiltrada: 0.32,
                porcentagemAguaInexistente: 0.0,
                porcentagemEsgotoInexistente: 0.0,
                porcentagemEnergiaInexistente: 0.0,
                porcentagemLixoRecicla: 0.32,
                porcentagemLixoColetaPeriodica: 1.0,
                porcentagemLaboratorioInformatica: 0.62,
                porcentagemSalaAtendimentoEspecial: 0.25,
                porcentagemLaboratorioCiencias: 0.42,
                porcentagemBiblioteca: 0.82,
                porcentagemSalaLeitura: 0.56,
                porcentagemInternet: 0.92,
                porcentagemBandaLarga: 0.95
            }];

            return ok({
                data: estatisticas,
            });
        }

        function getLocation() {
          return ok(
            {
              longitude: -53.8314,
              city: 'Santa Maria',
              timezone: 'America\/Sao_Paulo',
              offset: -10800,
              region: 'Rio Grande do Sul',
              asn: 18881,
              organization: 'TELEFÔNICA BRASIL S.A',
              country: 'Brazil',
              ip: '2804:7f6:8082:6b60:454b:656c:5c34:8e99',
              latitude: -29.7763,
              postal_code: '97000',
              continent_code: 'SA',
              country_code: 'BR',
              region_code: 'RS'
           });
        }

        function ok(body?) {
            return of(new HttpResponse({status: 200, body}));
        }

        function error(message) {
            return throwError({error: {message}});
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
