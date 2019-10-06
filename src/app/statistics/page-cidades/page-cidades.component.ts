import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { IEstatisticasCidade } from '../../shared/models/estatisticas';
import { StatisticsService } from 'src/app/services/statistics.service';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-cidades',
  templateUrl: './page-cidades.component.html',
  styleUrls: ['./page-cidades.component.scss']
})
export class PageCidadesComponent implements OnInit {
  options: IEstatisticasCidade[] = [];
  myControl: FormControl = new FormControl();

  constructor(private searchCityService: StatisticsService) { }

  ngOnInit() {

    this.myControl.valueChanges
      .subscribe(result => console.log(result));

    this.myControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
      .subscribe(myControl =>
        this.searchCityService.getEstatisticasCidade(myControl, 'Rio Grande do Sul').subscribe((response: Array <IEstatisticasCidade>) => {
          this.options = response;
          console.log(this.options);
        })
      );
  }

}
