import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { switchMap } from "rxjs";

import { PaginatorModule } from "primeng/paginator";
import { SharedModule } from "../../../shared/shared.module";
import { SkillsService } from "../../../shared/services/skills.service";
import { Skill } from "../../../shared/interfaces/skill";
import { PrimengModule } from "../../../primeng/primeng.module";
import { getErrorMsg, invalidField } from "../../../shared/utils";

@Component({
  selector: 'app-create-skill',
  standalone: true,
    imports: [
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        SharedModule,
        PrimengModule
    ],
  templateUrl: './create-skill.component.html',
  styleUrl: './create-skill.component.scss'
})
export class CreateSkillComponent {

  errorMsg: string = '';
  invalid: boolean = false;
  initialFormValues: any;

  rating: number = 0;

  skill: Skill = {
    name: '',
    rating: 0,
    icon: ''
  };

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    rating: [0, [Validators.required]],
    icon: ['fa-solid fa-gears', []]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private skillsService: SkillsService) {  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')) {
      this.activateRoute.params
        .pipe(
          switchMap( ({uid}) => this.skillsService.getSkillById(uid) )
        )
        .subscribe( response => {
          if(response) {
            this.skill = response;
            this.myForm.patchValue(this.skill);
          }
        });
    }
  }

  onSubmit() {

    if(this.myForm.valid){
      this.skill.name = this.myForm.get('name')?.value;
      this.skill.rating = this.myForm.get('rating')?.value;
      this.skill.icon = this.myForm.get('icon')?.value;
      if(this.skill.uid) {
        //PUT (Update)
        this.skillsService.updateSkill(this.skill)
          .subscribe( response => {
            if(response){
              this.invalid = false;
              this.errorMsg = '';
              this.router.navigate(['/admin/tabs/skills-subskills/table']);
            } else{
              this.invalid = true;
              this.errorMsg = 'Something went wrong! Try again.';
            }
          });
      } else {
        //POST (Create)
        this.skillsService.createSkill(this.skill)
          .subscribe( response => {
            if(response){
              this.invalid = false;
              this.errorMsg = '';
              this.router.navigate(['/admin/tabs/skills-subskills/table']);
            } else{
              this.invalid = true;
              this.errorMsg = 'Something went wrong! Try again.';
            }
          });
      }
    }
  }

  closeErrorMsg() {
    this.invalid = false;
    this.errorMsg = '';
  }

  protected readonly invalidField = invalidField;
  protected readonly getErrorMsg = getErrorMsg;

}
