import {async, TestBed, tick} from '@angular/core/testing';
import { ConnectionService } from './connection.service';
import {browser} from "protractor";
import {CardsComponent} from "../cards/cards.component";


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

});
