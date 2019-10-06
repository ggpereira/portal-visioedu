import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EscolaService } from '../../../services/escola.service';
import { FormControl } from '@angular/forms';
import { IResponseEscola } from '../../../shared/models/escola';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DADOS_ESTADOS, Estado } from '../../../shared/models/estados';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  results: any[] = [];
  queryField: FormControl = new FormControl();
  estados: Estado[];

  constructor(private searchService: EscolaService) { }

  ngOnInit() {
    this.estados = DADOS_ESTADOS;
    // this.queryField.valueChanges.pipe(
    //   distinctUntilChanged(), switchMap((query) =>  this.searchService.getEscolas(5, 1 , query)))
    //   .subscribe(queryField => this.searchService.getEscolas(5, 1, queryField)
    //   .subscribe((response: IResponseEscola) => {
    //     this.results = [];
    //     response.data.forEach(element => {
    //       this.results.push(element.no_entidade);
    //     });
    //   }
    //   ));
  }

  onChange(value) {
    this.valueChange.emit(value);
  }

}
