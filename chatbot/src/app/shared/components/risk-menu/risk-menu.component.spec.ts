import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMenuComponent } from './risk-menu.component';

describe('RiskMenuComponent', () => {
  let component: RiskMenuComponent;
  let fixture: ComponentFixture<RiskMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
