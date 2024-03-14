import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTimelineComponent } from './detailed-timeline.component';

describe('DetailedTimelineComponent', () => {
  let component: DetailedTimelineComponent;
  let fixture: ComponentFixture<DetailedTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
