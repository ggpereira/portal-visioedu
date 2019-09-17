import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';

import { EscolaService } from '../shared/escola.service';
import { IDataEscola, IEscola } from '../shared/models/escola';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataEscolas: IDataEscola;

  displayedColumns: string[] = ['co_entidade', 'no_entidade', 'qt_funcionarios', 'qt_salas_existentes'];

  dataSource: MatTableDataSource<IEscola>;

  constructor(private escolaService: EscolaService){}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.escolaService.getEscolas(40, 1).subscribe((data) => {
      this.dataEscolas = data;
      this.dataSource = new MatTableDataSource<IEscola>(this.dataEscolas.data);
      this.dataSource.paginator = this.paginator;
    });
  }
}


