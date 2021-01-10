import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardsComponent} from './cards.component';
import {LocalStorageService} from "../services/local-storage.service";
import {EstimationsComponent} from "../estimations/estimations.component";
import {TextViewComponent} from "../text-view/text-view.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {FormsModule} from "@angular/forms";


describe('CardsComponent', () => {
  let component: CardsComponent;
  let localStorageService: LocalStorageService = new LocalStorageService();
  let fixture: ComponentFixture<CardsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardsComponent,
        TextViewComponent,
        EstimationsComponent,
        HeaderComponent,
        FooterComponent
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        FormsModule
      ]
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
    expect(localStorageService.get("username")).toBe("Roberto");
    component.deleteUser();
    expect(localStorageService.get("username")).toBe('');
  });
});
