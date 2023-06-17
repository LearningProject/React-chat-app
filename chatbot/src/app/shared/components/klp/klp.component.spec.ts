import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KLPComponent } from './klp.component';

describe('KLPComponent', () => {
  let component: KLPComponent;
  let fixture: ComponentFixture<KLPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KLPComponent]
    });
    fixture = TestBed.createComponent(KLPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
