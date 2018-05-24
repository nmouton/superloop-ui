import { TestBed, inject } from '@angular/core/testing';

import { SuperloopApiService } from './superloop-api.service';

describe('SuperloopApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperloopApiService]
    });
  });

  it('should be created', inject([SuperloopApiService], (service: SuperloopApiService) => {
    expect(service).toBeTruthy();
  }));
});
