import {async, TestBed, tick} from '@angular/core/testing';
import { ConnectionService } from './connection.service';


fdescribe('ConnectionService', () => {
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

  it('should check if websocket-server is available', async (() => {

    service.connection.subscribe((data) => {
      JSON.parse(data).then(()=> {
        expect(data.text).toBe('ping')
      })
    });





  }));
});
