import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubskillComponent } from './create-subskill.component';

describe('CreateSubskillComponent', () => {
  let component: CreateSubskillComponent;
  let fixture: ComponentFixture<CreateSubskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubskillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
