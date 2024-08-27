import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSubskillsComponent } from './skills-subskills.component';

describe('SkillsSubskillsComponent', () => {
  let component: SkillsSubskillsComponent;
  let fixture: ComponentFixture<SkillsSubskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsSubskillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillsSubskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
