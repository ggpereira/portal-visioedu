import { TestBed } from '@angular/core/testing';

import { EnemService } from './enem.service';

describe('EnemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnemService = TestBed.get(EnemService);
    expect(service).toBeTruthy();
  });
});
