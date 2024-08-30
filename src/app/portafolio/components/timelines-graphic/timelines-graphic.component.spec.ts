import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinesGraphicComponent } from './timelines-graphic.component';

describe('TimelinesGraphicComponent', () => {
  let component: TimelinesGraphicComponent;
  let fixture: ComponentFixture<TimelinesGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinesGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelinesGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
