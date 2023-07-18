import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskKlpComponent } from './risk-klp.component';

describe('RiskKlpComponent', () => {
  let component: RiskKlpComponent;
  let fixture: ComponentFixture<RiskKlpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiskKlpComponent]
    });
    fixture = TestBed.createComponent(RiskKlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
