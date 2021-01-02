import {TestBed} from '@angular/core/testing';
import { ConnectionService } from './connection.service';


describe('ConnectionService', () => {
  let service: ConnectionService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionService);
    service.connection.next({
      type: "message", text: "ping"
    });
    service.connection.complete()

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
