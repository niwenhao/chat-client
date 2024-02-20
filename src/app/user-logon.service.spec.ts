import { TestBed } from '@angular/core/testing';

import { UserLogonService } from './user-logon.service';

describe('UserLogonService', () => {
  let service: UserLogonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
