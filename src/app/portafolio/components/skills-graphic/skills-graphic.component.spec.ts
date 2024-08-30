import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsGraphicComponent } from './skills-graphic.component';

describe('SkillsGraphicComponent', () => {
  let component: SkillsGraphicComponent;
  let fixture: ComponentFixture<SkillsGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillsGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
