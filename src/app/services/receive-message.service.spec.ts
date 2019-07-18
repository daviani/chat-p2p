import { TestBed } from '@angular/core/testing';

import { ReceiveMessageService } from './receive-message.service';

describe('ReceiveMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceiveMessageService = TestBed.get(ReceiveMessageService);
    expect(service).toBeTruthy();
  });
});
