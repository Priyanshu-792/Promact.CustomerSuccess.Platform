import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationMatrixComponent } from './escalation-matrix.component';

describe('EscalationMatrixComponent', () => {
  let component: EscalationMatrixComponent;
  let fixture: ComponentFixture<EscalationMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscalationMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscalationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
