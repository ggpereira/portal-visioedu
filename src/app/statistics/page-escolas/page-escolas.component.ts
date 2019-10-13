import { Component, OnInit } from '@angular/core';
import { EscolaService } from 'src/app/services/escola.service';
import { LocationService } from 'src/app/services/location.service';
import { ILocation } from '../../shared/models/location';
import { FormControl} from '@angular/forms';
import { IEscola, IResponseEscola } from 'src/app/shared/models/escola';
import { startWith, distinctUntilChanged } from 'rxjs/operators';
import { ICidade } from '../../shared/models/cidade';

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

  formCidadeControl: FormControl = new FormControl();
  formEscolaControl: FormControl = new FormControl();
  constructor(private escolaService: EscolaService, private locationService: LocationService) {
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
              console.log(this.dadosEscolas);
            });
        });
    });
  }

  onCidadeSelection(value) {
    console.log(value.source.value);
    console.log(value.source);
  }

  onEscolaSelection(value) {
    this.escolaAtual = this.findEscola(value.source.value);
    this.fillListEscolas(this.escolaAtual);
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

  findEscola(nome: string): IEscola {
    return this.escolas.find((escola: IEscola) => {
      return escola.no_entidade === nome;
    });
  }

}
