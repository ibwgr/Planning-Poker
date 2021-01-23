import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextViewComponent } from './text-view.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('TextViewComponent', () => {
  let component: TextViewComponent;
  let fixture: ComponentFixture<TextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextViewComponent,
        ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
