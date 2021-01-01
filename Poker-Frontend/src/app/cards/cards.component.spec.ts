import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import {LocalStorageService} from "../local-storage.service";


fdescribe('CardsComponent', () => {
  let component: CardsComponent;
  let localStorageService: LocalStorageService = new LocalStorageService();
  let fixture: ComponentFixture<CardsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should store new user in localstorage', () => {
    const type = "username";
    const user = "Roberto";
    component.persistUsername(type, user);
    expect(localStorageService.get("username")).toBe("Roberto")
  });

  it('should delete username from localstorage', () => {
    component.deleteUser();
    expect(localStorageService.get("username")).toBe('');
  });
});
