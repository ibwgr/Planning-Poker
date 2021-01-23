import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationsComponent } from './estimations.component';
import {CardsComponent} from "../cards/cards.component";
import {TextViewComponent} from "../text-view/text-view.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {MatLabel} from "@angular/material/form-field";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('EstimationsComponent', () => {
  let component: EstimationsComponent;
  let fixture: ComponentFixture<EstimationsComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EstimationsComponent,
        CardsComponent,
        TextViewComponent,
        HeaderComponent,
        FooterComponent,
        MatLabel,
        MatSlideToggle ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationsComponent);
    component = fixture.componentInstance;
    component.fibonacciMaster = [1, 2, 3, 5, 8, 0];

    fixture.detectChanges();
  });

  it('should calculate right average int',  () => {
    const votes = [5,5,5];
    expect(component.calcAverage(votes)).toEqual(5);
  });

  it('should calculate right average float',  () => {
    const votes = [5,3,2];
    expect(component.calcAverage(votes)).toEqual(3.33);
  });

  it('should calculate the right sum', () => {
    const votes = [2,3,4];
    expect(component.calcSum(votes)).toEqual(9)
  });

  it('should remove usernames from votes',  () => {
    const votes = component.votes = ['Roberto, 5', 'Sebi, 3', 'Fritz, 8'];
    let removedUsernames = component.removeUsernames(votes)
    expect(removedUsernames).toEqual([5, 3, 8])
  });


  it('should remove all zero-votes', () => {
    const values = component.votes = [1, 3, 0, 5];
    let usernames = component.removeUsernames(values).filter(component.removeZeros());
    expect(usernames.length).toBe(3)
  });



});
