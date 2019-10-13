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
            });
        });
    });
  }

}
