import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedTeamComponent } from './approved-team.component';

describe('ApprovedTeamComponent', () => {
  let component: ApprovedTeamComponent;
  let fixture: ComponentFixture<ApprovedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
