import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeHoldersComponent } from './stake-holders.component';

describe('StakeHoldersComponent', () => {
  let component: StakeHoldersComponent;
  let fixture: ComponentFixture<StakeHoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StakeHoldersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StakeHoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
