import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseMilestoneComponent } from './phase-milestone.component';

describe('PhaseMilestoneComponent', () => {
  let component: PhaseMilestoneComponent;
  let fixture: ComponentFixture<PhaseMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhaseMilestoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhaseMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
