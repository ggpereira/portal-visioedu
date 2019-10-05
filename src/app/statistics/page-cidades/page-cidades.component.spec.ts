import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCidadesComponent } from './page-cidades.component';

describe('PageCidadesComponent', () => {
  let component: PageCidadesComponent;
  let fixture: ComponentFixture<PageCidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
