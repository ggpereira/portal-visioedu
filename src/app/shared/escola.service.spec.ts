import { TestBed } from '@angular/core/testing';

import { EscolaService } from './escola.service';

describe('EscolaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscolaService = TestBed.get(EscolaService);
    expect(service).toBeTruthy();
  });
});
