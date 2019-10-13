import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EscolaService } from '../../../services/escola.service';
import { FormControl } from '@angular/forms';
import { DADOS_ESTADOS, Estado } from '../../../shared/models/estados';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  @Input() defaultStateName;

  results: any[] = [];
  queryField: FormControl = new FormControl();
  estados: Estado[];

  constructor(private searchService: EscolaService) { }

  ngOnInit() {
    this.estados = DADOS_ESTADOS;
  }

  findEstado(nome: string) {
    return this.estados.find((estado: Estado) => {
      return estado.estado === nome;
    });
  }

  onChange(value) {
    this.valueChange.emit(this.findEstado(value));
  }

}
