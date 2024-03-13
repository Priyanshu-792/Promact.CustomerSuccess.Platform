import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetComponent } from './project-budget.component';

describe('ProjectBudgetComponent', () => {
  let component: ProjectBudgetComponent;
  let fixture: ComponentFixture<ProjectBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
