import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingMinuteComponent } from './meeting-minute.component';

describe('MeetingMinuteComponent', () => {
  let component: MeetingMinuteComponent;
  let fixture: ComponentFixture<MeetingMinuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingMinuteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
