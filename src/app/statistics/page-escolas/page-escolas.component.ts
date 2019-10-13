import { Component, OnInit } from '@angular/core';
import { EscolaService } from 'src/app/services/escola.service';
import { LocationService } from 'src/app/services/location.service';
import { ILocation } from '../../shared/models/location';
import { FormControl} from '@angular/forms';
import { IEscola, IResponseEscola } from 'src/app/shared/models/escola';
import { startWith, distinctUntilChanged } from 'rxjs/operators';

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


  formCidadeControl: FormControl = new FormControl();
  formEscolaControl: FormControl = new FormControl();
  constructor(private escolaService: EscolaService, private locationService: LocationService) {
   }

  ngOnInit() {
    this.locationService.getLocation().subscribe((locationData: ILocation) => {
      this.location = locationData;
      this.cidadeAtual = this.location.city;
      this.estadoAtual = this.location.region;
      this.formCidadeControl.setValue(this.location.city);
      this.escolaService.getEscolasWithFilters(this.location.city, this.location.region).subscribe((dadosEscolas: IResponseEscola) => {
        this.escolas = dadosEscolas.data;
      });

      this.formCidadeControl.valueChanges.pipe(distinctUntilChanged(), startWith(''))
        .subscribe(formValue => {
          this.locationService.getCidades(formValue);
        });
    });
  }

}
