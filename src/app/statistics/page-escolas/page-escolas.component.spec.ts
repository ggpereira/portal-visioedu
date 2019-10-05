import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEscolasComponent } from './page-escolas.component';

describe('PageEscolasComponent', () => {
  let component: PageEscolasComponent;
  let fixture: ComponentFixture<PageEscolasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEscolasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEscolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
