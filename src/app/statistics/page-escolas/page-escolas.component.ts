import { Component, OnInit, OnDestroy } from '@angular/core';
import { EscolaService } from 'src/app/services/escola.service';
import { LocationService } from 'src/app/services/location.service';
import { ILocation } from '../../shared/models/location';
import { FormControl} from '@angular/forms';
import { IEscola, IResponseEscola } from 'src/app/shared/models/escola';
import { startWith, distinctUntilChanged } from 'rxjs/operators';
import { ICidade } from '../../shared/models/cidade';
import { EnemService } from '../../services/enem.service';
import { IMediasEnem } from 'src/app/shared/models/enem';
import { ChartConf } from 'src/app/charts/charts.component';
import { EscolaViewData, EscolaInfoData } from 'src/app/shared/models/escola';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-escolas',
  templateUrl: './page-escolas.component.html',
  styleUrls: ['./page-escolas.component.scss']
})
export class PageEscolasComponent implements OnInit, OnDestroy {
  location: ILocation;
  escolas: Array<IEscola>;
  cidadeAtual: string;
  estadoAtual: string;
  ufAtual: string;
  dadosCidades: Array<ICidade>;
  dadosEscolas: Array<IEscola>;
  escolaAtual: IEscola;
  escolaViewData = EscolaViewData;
  escolaViewInfo = EscolaInfoData;
  objectKeys = Object.keys;

  mediasEnem: IMediasEnem;
  barChartConf: ChartConf;
  public colors = [
    {
      backgroundColor: [
        '#9932CC',
        '#9370DB',
        '#E6E6FA',
        '#9975B9',
        '#BFA8D3',
      ]
    }
  ];

  // subscriptions
  escolas$: Subscription;
  location$: Subscription;
  dadosCidades$: Subscription;
  dadosEscolas$: Subscription;
  mediasEnem$: Subscription;
  formCidadeControl$: Subscription;
  formEscolaControl$: Subscription;

  formCidadeControl: FormControl = new FormControl();
  formEscolaControl: FormControl = new FormControl();
  constructor(
    private escolaService: EscolaService,
    private locationService: LocationService,
    private enemService: EnemService) {
   }

  ngOnInit() {
    this.location$ = this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.cidadeAtual = this.location.city;
      this.estadoAtual = this.location.region;
      this.ufAtual = this.location.region_code;
      this.formCidadeControl.setValue(this.location.city);

      // Dados de escolas
      this.getEscolasPorCidade(this.location.city, this.location.region);

      // Entrada de busca
      this.formCidadeControl$ = this.formCidadeControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.dadosCidades$ = this.locationService.getCidades(formValue, this.ufAtual).subscribe((data: Array<ICidade>) => {
            this.dadosCidades = data;
          });
        });
      // Entrada de escolas
      this.formEscolaControl$ = this.formEscolaControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.dadosEscolas$ = this.escolaService.getEscolasWithFilters(this.cidadeAtual, this.estadoAtual, formValue)
            .subscribe((data: IResponseEscola) => {
              // Pega por nome
              this.dadosEscolas = data.data;
            });
        });
    });
  }

  ngOnDestroy() {
    this.location$.unsubscribe();
    this.mediasEnem$.unsubscribe();
    this.escolas$.unsubscribe();
    this.formCidadeControl$.unsubscribe();
    this.formEscolaControl$.unsubscribe();
    this.dadosCidades$.unsubscribe();
    this.dadosEscolas$.unsubscribe();
  }

  onCidadeSelection(value) {
    this.mudarCidade(value.source.value);
    this.formEscolaControl.reset();
    this.atualizarArrayEscolas(this.cidadeAtual, this.estadoAtual);
  }

  // Atualiza o array de escolas com as escolas da cidade e estado atual
  atualizarArrayEscolas(cidade: string, estado: string) {
    this.getEscolasPorCidade(cidade, estado);
  }

  // Muda o valor da variável cidadeAtual
  mudarCidade(nome: string) {
    this.cidadeAtual = nome;
  }

  // Muda o valor da variável estadoAtual e ufAtual
  mudarEstado(nome: string, uf: string) {
    this.estadoAtual = nome;
    this.ufAtual = uf;
  }

  onEscolaSelection(value) {
    this.escolaAtual = this.findEscola(value.source.value);
    this.fillViewInfoEscolas(this.escolaAtual);
    this.fillViewEstruturaEscolas(this.escolaAtual);
    this.mediasEnem$ = this.enemService.getMediaByCodEscola(this.escolaAtual.co_entidade)
      .subscribe(
        (data: IMediasEnem) => {
        this.mediasEnem = data;
        this.barChartConf = {
          title: 'Médias Enem',
          iconName: 'bar_chart',
          chartType: 'bar',
          chartLabels: ['Humanas', 'Naturais', 'Matemática', 'Redação', 'Linguagens', 'Geral'],
          chartPlugins: [],
          legend: true,
          chartData: [{
            data: [
              this.mediasEnem.mediaCh,
              this.mediasEnem.mediaCn,
              this.mediasEnem.mediaMat,
              this.mediasEnem.mediaRedacao,
              this.mediasEnem.mediaLc,
              this.mediasEnem.mediaGeral
            ],
            label: 'Médias',
          }],
          chartOptions: {
            responsive: true
          },
          subHeader: this.escolaAtual.no_entidade
        };
      },
      (err) => {
        this.mediasEnem = undefined;
        this.barChartConf = undefined;
      }
    );
  }

  // Preenche dados exibidos no cards relacionados a estrutura
  fillViewEstruturaEscolas(dadosEscola: IEscola) {
    // Agua
    this.escolaViewData.Agua.value = dadosEscola.agua;
    // Agua filtrada
    this.escolaViewData.AguaFiltrada.value = dadosEscola.agua_filtrada;
    // Banda larga
    this.escolaViewData.BandaLarga.value = dadosEscola.bandaLarga;
    // Biblioteca
    this.escolaViewData.Biblioteca.value = dadosEscola.biblioteca;
    // Coleta de lixo
    this.escolaViewData.ColetaDeLixo.value = dadosEscola.coletaDeLixo;
    // Energia Elétrica
    this.escolaViewData.EnergiaEletrica.value = dadosEscola.energia;
    // Equipamento Multimídia
    this.escolaViewData.EquipamentoMultimidia.value = dadosEscola.equipamentoMultimidia;
    // Esgoto
    this.escolaViewData.Esgoto.value = dadosEscola.esgoto;
    // Espaço de leitura na biblioteca
    this.escolaViewData.EspacoDeLeituraBiblioteca.value = dadosEscola.bibliotecaSalaLeitura;
    // Internet
    this.escolaViewData.Internet.value = dadosEscola.internet;
    // Reciclagem
    this.escolaViewData.Reciclagem.value = dadosEscola.reciclagem;
    // Sala Atendimento especial
    this.escolaViewData.SalaAtendimentoEspecial.value = dadosEscola.salaAtendimentoEspecial;
    // Sala de leitura
    this.escolaViewData.SalaDeLeitura.value = dadosEscola.salaLeitura;
    // Laboratório de ciências
    this.escolaViewData.LaboratorioDeCiencias.value = dadosEscola.laboratorioCiencias;
  }

  fillViewInfoEscolas(dadosEscola: IEscola) {
    // Atendimento educacional especializado
    this.escolaViewInfo.AtendimentoEducacionalEspecializado.value = dadosEscola.tp_aee;
    // Dependência
    this.escolaViewInfo.Dependencia.value = dadosEscola.dependencia;
    // Quantidade de salas utilizadas
    this.escolaViewInfo.QuantidadeDeSalasUtilizadas.value = dadosEscola.qtSalasUtilizadas;
    // Quantidade de funcionários
    this.escolaViewInfo.QuantidadeFuncionarios.value = dadosEscola.qtFuncionarios;
    // Quantidade de salas
    this.escolaViewInfo.QuantidadeSalas.value = dadosEscola.qtSalas;
    // Situação funcionamento
    this.escolaViewInfo.SituacaoFuncionamento.value = dadosEscola.situacao_funcionamento;
    // Tipo de localização
    this.escolaViewInfo.TipoDeLocalizacao.value = dadosEscola.tp_localizacao;
  }

  findEscola(nome: string): IEscola {
    return this.escolas.find((escola: IEscola) => {
      return escola.no_entidade === nome;
    });
  }

  // Divide o vetor de dados relacionados a infraestrutura
  partitionEscolaViewData(i: number) {
    const keys = this.objectKeys(this.escolaViewData);
    const start = (i - 1) * (keys.length / 2);
    const end =  i * ((keys.length / 2) - 1);
    return keys.splice(start, end);
  }


  getEscolasPorCidade(cidade: string, estado: string) {
    this.escolas$ = this.escolaService.getEscolasWithFilters(cidade, estado).subscribe((dadosEscolas: IResponseEscola) => {
      this.escolas = dadosEscolas.data;
    });
  }

  selectedStateValue(value) {
    this.mudarEstado(value.estado, value.uf);
    this.formCidadeControl.reset();
    this.formEscolaControl.reset();
  }

}
