import { Component, OnInit, OnDestroy } from '@angular/core';
import { EscolaService } from 'src/app/services/escola.service';
import { LocationService } from 'src/app/services/location.service';
import { ILocation } from '../shared/models/location';
import { FormControl } from '@angular/forms';
import { IEscola, IResponseEscola } from 'src/app/shared/models/escola';
import { startWith, distinctUntilChanged } from 'rxjs/operators';
import { IMediasEnem } from 'src/app/shared/models/enem';
import { ICidade } from '../shared/models/cidade';
import { EnemService } from '../services/enem.service';
import { IEstatisticas, IEstatisticasEstado, IEstatisticasCidade } from '../shared/models/estatisticas';
import { StatisticsService } from '../services/statistics.service';
import { Subscription, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

interface IViewDataLocal {
  icon: string;
  lugar: string;
  aguaFiltrada: number;
  aguaInexistente: number;
  bandaLarga: number;
  biblioteca: number;
  energiaInexistente: number;
  esgotoInexistente: number;
  internet: number;
  laboratorioCiencias: number;
  laboratorioInformatica: number;
  coletaPeriodica: number;
  lixoRecicla: number;
  atendimentoEspecial: number;
  salaLeitura: number;
  qtdEscolas: number;
  mediaCh: number;
  mediaCn: number;
  mediaLc: number;
  mediaRedacao: number;
  mediaMat: number;
  mediaGeral: number;
}

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit, OnDestroy {
  escola: IEscola;
  escolaMedias: IMediasEnem;

  estado: IEstatisticasEstado;
  estadoMedias: IMediasEnem;

  cidade: IEstatisticasCidade;
  cidadeMedias: IMediasEnem;

  location: ILocation;
  cidadeAtual: string;
  estadoAtual: string;
  ufAtual: string;

  data: IViewDataLocal;

  escolas: Array<IEscola>;
  dadosCidades: Array<ICidade>;
  dadosEscolas: Array<IEscola>;

  formCidadeControl: FormControl = new FormControl();
  formEscolaControl: FormControl = new FormControl();

  // subscriptions
  escolas$: Subscription;
  location$: Subscription;
  formCidade$: Subscription;
  formEscola$: Subscription;
  dadosCidades$: Subscription;
  dadosEscolas$: Subscription;
  estado$: Subscription;
  estadoMedias$: Subscription;
  cidade$: Subscription;
  cidadeMedias$: Subscription;
  escolaMedias$: Subscription;

  isEmptyEscola = true;

  // tslint:disable-next-line: max-line-length
  constructor(private escolaService: EscolaService, private statisticsService: StatisticsService, private locationService: LocationService, private enemService: EnemService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.location$ = this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.cidadeAtual = this.location.city;
      this.estadoAtual = this.location.region;
      this.ufAtual = this.location.region_code;
      this.formCidadeControl.setValue(this.location.city);

      // Dados de escolas
      // tslint:disable-next-line: max-line-length
      this.escolas$ = this.escolaService.getEscolasWithFilters(this.location.city, this.location.region).subscribe((dadosEscolas: IResponseEscola) => {
        this.escolas = dadosEscolas.data;
      });

      // Entrada de busca
      this.formCidade$ = this.formCidadeControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.locationService.getCidades(formValue, this.ufAtual).subscribe((data: Array<ICidade>) => {
            this.dadosCidades = data;
          });
        });
      // Entrada de escolas
      this.formEscola$ = this.formEscolaControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.escolas$ = this.escolaService.getEscolasWithFilters(this.cidadeAtual, this.estadoAtual, formValue)
            .subscribe((data: IResponseEscola) => {
              this.dadosEscolas = data.data;
            });
        });
    });
  }

  ngOnDestroy() {
    this.destroySubscription(this.location$);
    this.destroySubscription(this.escolas$);
    this.destroySubscription(this.formCidade$);
    this.destroySubscription(this.formEscola$);
    this.destroySubscription(this.escolaMedias$);
    this.destroySubscription(this.cidadeMedias$);
    this.destroySubscription(this.estadoMedias$);
    this.destroySubscription(this.cidade$);
    this.destroySubscription(this.estado$);
  }

  getMediaEscola(escola: IEscola) {
    this.escola = escola;
    this.escolaMedias$ = this.enemService.getMediaByCodEscola(escola.co_entidade)
      .subscribe(
        (dadosMedias: IMediasEnem) => {
          this.escolaMedias = dadosMedias;
        },
        (err) => {
        this.isEmptyEscola = false;
        this.openSnackBar('Não foi possível carregar as informações. Tente novamente mais tarde.', 'Ok');
        this.escolaMedias = undefined;
        }
    );
  }

  findEscolaEstatisticas(nome: string) {
    return this.escolas.find((escola: IEscola) => {
      return escola.no_entidade === nome;
    });
  }

  getMediaCidade(cidade: IEstatisticasCidade) {
    // tslint:disable-next-line: max-line-length
    this.cidadeMedias$ = this.enemService.getMediasCidades(cidade.municipio, this.estadoAtual).subscribe((dadosMedias: Array<IMediasEnem>) => {
      this.cidadeMedias = dadosMedias[0];
      this.mudarDadosCidade(this.cidadeMedias, this.cidade);
    });
  }

  getMediaEstado(estado: IEstatisticasEstado) {
     this.estadoMedias$ =  this.enemService.getMediasEstados(estado.estado).subscribe((dadosMedias: Array<IMediasEnem>) => {
      this.estadoMedias = dadosMedias[0];
    });
  }

  findCidadeEstatisticas(nomeCidade: string, nomeEstado: string) {
   // tslint:disable-next-line: max-line-length
   this.cidade$ =  this.statisticsService.getEstatisticasCidade(nomeCidade, nomeEstado).subscribe((response: Array<IEstatisticasCidade>) => {
      this.cidade = response[0];
      this.getMediaCidade(this.cidade);
    });
  }

  findEstadoEstatisticas(nomeEstado: string) {
    this.estado$ = this.statisticsService.getEstatisticasEstado(nomeEstado).subscribe((response: Array<IEstatisticasEstado>) => {
      this.estado = response[0];
      this.getMediaEstado(this.estado);
    });
  }

  onSelectionEscola(value) {
    this.isEmptyEscola = false;
    this.getMediaEscola(this.findEscolaEstatisticas(value.source.value));
    this.findCidadeEstatisticas(this.cidadeAtual, this.estadoAtual);
    this.findEstadoEstatisticas(this.estadoAtual);
  }

  onSelectionCidade(value) {
    this.mudarCidadeAtual(value.source.value);
    this.atualizarArrayEscolas(this.cidadeAtual, this.estadoAtual);
    this.formEscolaControl.reset();
  }

  mudarDadosCidade(cidade?: any, cidadeMedia?: any) {
    this.data = {
      icon: 'location_city',
      lugar: this.cidade.municipio,
      aguaFiltrada: this.cidade.porcentagemAguaFiltrada,
      aguaInexistente: this.cidade.porcentagemAguaInexistente,
      bandaLarga: this.cidade.porcentagemBandaLarga,
      biblioteca: this.cidade.porcentagemBiblioteca,
      energiaInexistente: this.cidade.porcentagemEnergiaInexistente,
      esgotoInexistente: this.cidade.porcentagemEsgotoInexistente,
      internet: this.cidade.porcentagemInternet,
      laboratorioCiencias: this.cidade.porcentagemLaboratorioCiencias,
      laboratorioInformatica: this.cidade.porcentagemLaboratorioInformatica,
      coletaPeriodica: this.cidade.porcentagemLixoColetaPeriodica,
      lixoRecicla: this.cidade.porcentagemLixoRecicla,
      atendimentoEspecial: this.cidade.porcentagemSalaAtendimentoEspecial,
      salaLeitura: this.cidade.porcentagemSalaLeitura,
      qtdEscolas: this.cidade.qtdEscolas,
      mediaCh: this.cidadeMedias.mediaCh,
      mediaCn: this.cidadeMedias.mediaCn,
      mediaLc: this.cidadeMedias.mediaLc,
      mediaRedacao: this.cidadeMedias.mediaRedacao,
      mediaMat: this.cidadeMedias.mediaMat,
      mediaGeral: this.cidadeMedias.mediaGeral
    };
  }

  mudarDadosEstado() {
    this.data = {
      icon: 'terrain',
      lugar: this.estado.estado,
      aguaFiltrada: this.estado.porcentagemAguaFiltrada,
      aguaInexistente: this.estado.porcentagemAguaInexistente,
      bandaLarga: this.estado.porcentagemBandaLarga,
      biblioteca: this.estado.porcentagemBiblioteca,
      energiaInexistente: this.estado.porcentagemEnergiaInexistente,
      esgotoInexistente: this.estado.porcentagemEsgotoInexistente,
      internet: this.estado.porcentagemInternet,
      laboratorioCiencias: this.estado.porcentagemLaboratorioCiencias,
      laboratorioInformatica: this.estado.porcentagemLaboratorioInformatica,
      coletaPeriodica: this.estado.porcentagemLixoColetaPeriodica,
      lixoRecicla: this.estado.porcentagemLixoRecicla,
      atendimentoEspecial: this.estado.porcentagemSalaAtendimentoEspecial,
      salaLeitura: this.estado.porcentagemSalaLeitura,
      qtdEscolas: this.estado.qtdEscolas,
      mediaCh: this.estadoMedias.mediaCh,
      mediaCn: this.estadoMedias.mediaCn,
      mediaLc: this.estadoMedias.mediaLc,
      mediaRedacao: this.estadoMedias.mediaRedacao,
      mediaMat: this.estadoMedias.mediaMat,
      mediaGeral: this.estadoMedias.mediaGeral
    };
  }

  atualizarArrayEscolas(cidade: string, estado: string) {
    this.getEscolasPorCidade(cidade, estado);
  }

  getEscolasPorCidade(cidade: string, estado: string) {
    this.escolas$ = this.escolaService.getEscolasWithFilters(cidade, estado).subscribe((dadosEscolas: IResponseEscola) => {
      this.escolas = dadosEscolas.data;
    });
  }

  mudarCidadeAtual(cidade: string) {
    this.cidadeAtual = cidade;
  }

  mudarEstadoAtual(estado: string, uf: string) {
    this.estadoAtual = estado;
    this.ufAtual = uf;
  }

  selectedStateValue(value) {
    this.mudarEstadoAtual(value.estado, value.uf);
    this.formCidadeControl.reset();
    this.formEscolaControl.reset();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  destroySubscription(s: Subscription) {
    if (s !== undefined) {
      s.unsubscribe();
    }
  }
}
