// authentication.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';


describe('AuthenticationService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const isAuthenticated = service.login(username, password).subscribe((res)=>{
      expect(res).toBe(true);
    });

  });
});
