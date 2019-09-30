import { Component, OnInit } from '@angular/core';
import { EscolaService } from '../services/escola.service';
import { FormControl } from '@angular/forms';
import { IDataEscola } from '../shared/models/escola';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(private searchService: EscolaService) { }

  ngOnInit() {
    this.queryField.valueChanges.pipe(
      distinctUntilChanged(),switchMap((query) =>  this.searchService.getEscolas(5, 1 , query)))
      .subscribe(queryField => this.searchService.getEscolas(5, 1, queryField)
      .subscribe((response: IDataEscola) => {
        this.results = [];
        response.data.forEach(element => {
          this.results.push(element.no_entidade);
        });
      }
      ));
  }

}
