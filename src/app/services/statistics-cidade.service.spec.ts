import { TestBed } from '@angular/core/testing';

import { StatisticsCidadeService } from './statistics-cidade.service';

describe('StatisticsCidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticsCidadeService = TestBed.get(StatisticsCidadeService);
    expect(service).toBeTruthy();
  });
});
