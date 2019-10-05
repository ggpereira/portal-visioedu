import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEstadosComponent } from './page-estados.component';

describe('PageEstadosComponent', () => {
  let component: PageEstadosComponent;
  let fixture: ComponentFixture<PageEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
