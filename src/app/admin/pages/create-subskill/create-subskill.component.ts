import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { switchMap } from "rxjs";

import { PaginatorModule } from "primeng/paginator";
import { SharedModule } from "../../../shared/shared.module";
import { SubskillsService } from "../../../shared/services/subskills.service";
import { Subskill } from "../../../shared/interfaces/subskill";
import { getErrorMsg, invalidField } from "../../../shared/utils";

@Component({
  selector: 'app-create-subskill',
  standalone: true,
    imports: [
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        SharedModule
    ],
  templateUrl: './create-subskill.component.html',
  styleUrl: './create-subskill.component.scss'
})
export class CreateSubskillComponent {

  errorMsg: string = '';
  invalid: boolean = false;
  initialFormValues: any;

  subskill: Subskill = {
    name: '',
    skill_uid: ''
  };

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private subskillsService: SubskillsService) {  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')) {
      this.activateRoute.params
        .pipe(
          switchMap( ({uid}) => this.subskillsService.getSubskillById(uid) )
        )
        .subscribe( response => {
          if(response) {
            this.subskill = response;
            this.myForm.patchValue(this.subskill);
          }
        });
    } else {
      this.activateRoute.params
        .subscribe(({ uid }) => {
          this.subskill.skill_uid = uid;
        });
    }
  }

  onSubmit() {
    if(this.myForm.valid){
      this.subskill.name = this.myForm.get('name')?.value;
      if(this.subskill.uid) {
        //PUT (Update)
        this.subskillsService.updateSubskill(this.subskill)
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
        this.subskillsService.createSubskill(this.subskill)
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
