import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-page-escolas',
  templateUrl: './page-escolas.component.html',
  styleUrls: ['./page-escolas.component.scss']
})
export class PageEscolasComponent implements OnInit {
  location: ILocation;
  escolas: Array<IEscola>;
  cidadeAtual: string;
  estadoAtual: string;
  ufAtual: string;
  dadosCidades: Array<ICidade>;
  dadosEscolas: Array<IEscola>;
  escolaAtual: IEscola;
  listaEscolaDados: Array<any> = [];
  listaEstruturaEscolas1: Array<any> = [];
  listaEstruturaEscolas2: Array<any> = [];

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

  formCidadeControl: FormControl = new FormControl();
  formEscolaControl: FormControl = new FormControl();
  constructor(
    private escolaService: EscolaService,
    private locationService: LocationService,
    private enemService: EnemService) {
   }

  ngOnInit() {
    this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.cidadeAtual = this.location.city;
      this.estadoAtual = this.location.region;
      this.ufAtual = this.location.region_code;
      this.formCidadeControl.setValue(this.location.city);
      // Dados de escolas
      this.escolaService.getEscolasWithFilters(this.location.city, this.location.region).subscribe((dadosEscolas: IResponseEscola) => {
        this.escolas = dadosEscolas.data;
      });

      // Entrada de busca
      this.formCidadeControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.locationService.getCidades(formValue, this.ufAtual).subscribe((data: Array<ICidade>) => {
            this.dadosCidades = data;
          });
        });
      // Entrada de escolas
      this.formEscolaControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.escolaService.getEscolasWithFilters(this.cidadeAtual, this.estadoAtual, formValue)
            .subscribe((data: IResponseEscola) => {
              this.dadosEscolas = data.data;
            });
        });
    });
  }

  onCidadeSelection(value) {
    this.cidadeAtual = value.source.value;
    this.formEscolaControl.reset();
  }

  onEscolaSelection(value) {
    this.escolaAtual = this.findEscola(value.source.value);
    this.fillListEscolas(this.escolaAtual);
    this.fillEstruturaEscola(this.escolaAtual);
    this.enemService.getMediaByCodEscola(this.escolaAtual.co_entidade).subscribe((data: IMediasEnem) => {
      this.mediasEnem = data;
      console.log('passa por aqui');
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


    });
  }

  fillListEscolas(dadosEscola: IEscola) {
    this.listaEscolaDados = [];
    // tslint:disable-next-line: max-line-length
    this.listaEscolaDados.push({ label: 'Situação Funcionamento', value: dadosEscola.situacao_funcionamento, icon: 'info', color: '#9493EA'});
    this.listaEscolaDados.push({ label: 'Dependência', value: dadosEscola.dependencia, icon: 'info', color: '#900C3F' });
    this.listaEscolaDados.push({ label: 'Tipo de Localização', value: dadosEscola.tp_localizacao, icon: 'terrain', color: '#D85426'});
    this.listaEscolaDados.push({ label: 'Quantidade de Funcionários', value: dadosEscola.qtFuncionarios, icon: 'person', color: '#6E16CB'});
    this.listaEscolaDados.push({ label: 'Quantidade de Salas', value: dadosEscola.qtSalas, icon: 'meeting_room', color: '#FFC300'});
    this.listaEscolaDados.push({ label: 'Salas Utilizadas', value: dadosEscola.qtSalasUtilizadas, icon: 'meeting_room', color: '#FF5733' });
    // tslint:disable-next-line: max-line-length
    this.listaEscolaDados.push({ label: 'Atendimento Educacional Especializado', value: dadosEscola.tp_aee, icon: 'supervisor_account', color: '#7BCAC7'});
  }

  fillEstruturaEscola(dadosEscola: IEscola) {
    this.listaEstruturaEscolas1 = [];
    this.listaEstruturaEscolas2 = [];
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas1.push({ label: 'Laboratorio de Informática', value: dadosEscola.laboratorioDeInformatica, icon: 'desktop_windows', color: '#3D52C8' });
    this.listaEstruturaEscolas1.push({ label: 'Internet', value: dadosEscola.internet, icon: 'language', color: '#C65C86' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas1.push({ label: 'Banda Larga', value: dadosEscola.bandaLarga, icon: 'settings_input_antenna', color: '#7BCAC7' });
    this.listaEstruturaEscolas1.push({ label: 'Água Filtrada', value: dadosEscola.agua_filtrada, icon: 'local_drink', color: '#900C3F' });
    this.listaEstruturaEscolas1.push({ label: 'Água', value: dadosEscola.agua, icon: 'local_drink', color: '#2384FF' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas1.push({label: 'Energia Elétrica', value: dadosEscola.energia, icon: 'flash_on', color: '#EEE415' });
    this.listaEstruturaEscolas1.push({ label: 'Reciclagem', value: dadosEscola.qtSalas, icon: 'info', color: '#FFC300' });
    this.listaEstruturaEscolas1.push({ label: 'Esgoto', value: dadosEscola.esgoto, icon: 'info', color: '#567569' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas2.push({ label: 'Coleta de Lixo', value: dadosEscola.tp_aee, icon: 'info', color: '#7BCAC7' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas2.push({ label: 'Laboratório de Ciências', value: dadosEscola.laboratorioCiencias, icon: 'toys', color: '#7BCAC7' });
    this.listaEstruturaEscolas2.push({ label: 'Biblioteca', value: dadosEscola.biblioteca, icon: 'book', color: '#7BCAC7' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas2.push({ label: 'Espaço de Leitura na Biblioteca', value: dadosEscola.bibliotecaSalaLeitura, icon: 'book', color: '#21D977' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas2.push({ label: 'Sala para atendimento Especial', value: dadosEscola.salaAtendimentoEspecial, icon: 'supervisor_account', color: '#1A854C' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas2.push({ label: 'Equipamento Multimídia', value: dadosEscola.equipamentoMultimidia, icon: 'devices', color: '#900C3F' });
    // tslint:disable-next-line: max-line-length
    this.listaEstruturaEscolas2.push({ label: 'Sala de leitura', value: dadosEscola.salaLeitura, icon: 'book', color: '#FF5733'});
  }

  findEscola(nome: string): IEscola {
    return this.escolas.find((escola: IEscola) => {
      return escola.no_entidade === nome;
    });
  }

  selectedStateValue(value) {
    this.estadoAtual = value.estado;
    this.ufAtual = value.uf;
    this.formCidadeControl.reset();
    this.formEscolaControl.reset();
  }

}
