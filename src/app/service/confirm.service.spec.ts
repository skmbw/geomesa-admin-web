import {TestBed} from '@angular/core/testing';

import {ConfirmService} from './confirm.service';

describe('ConfirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmService = TestBed.get(ConfirmService);
    expect(service).toBeTruthy();
  });
});
