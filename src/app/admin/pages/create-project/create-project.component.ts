import {Component, OnInit} from '@angular/core';
import {getErrorMsg, invalidField} from "../../../shared/utils";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../../shared/services/projects.service";
import {Project} from "../../../shared/interfaces/project";
import {switchMap} from "rxjs";
import {KnobModule} from "primeng/knob";
import {ImagesComponent} from "../../components/images/images.component";

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    KnobModule,
    ImagesComponent
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent implements OnInit{

  errorMsg: string = '';
  invalid: boolean = false;
  setID: boolean = false;
  initialFormValues: any;

  project: Project = {
    name: '',
    description: '',
    tech: ''
  };

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    tech: ['', []],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private projectsService: ProjectsService) {  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')) {
      this.activateRoute.params
        .pipe(
          switchMap( ({uid}) => this.projectsService.getProjectById(uid) )
        )
        .subscribe( response => {
          if(response) {
            this.project = response;
            this.setID = true;
            this.myForm.patchValue(this.project);
          }
        });
    }
  }

  createProject() {
    if(this.myForm.valid){
      this.project.name = this.myForm.get('name')?.value;
      this.project.description = this.myForm.get('description')?.value;
      this.project.tech = this.myForm.get('tech')?.value;
      //POST (Create)
      this.projectsService.createProject(this.project)
        .subscribe( response => {
          if(response){
            this.project.uid = response.uid;
            this.invalid = false;
            this.errorMsg = '';
            this.setID = true;
          } else{
            this.invalid = true;
            this.errorMsg = 'Something went wrong! Try again.';
            // this.message = [{ severity: 'contrast', detail: 'Something went wrong! Try again.' }];
          }
        });
    }
  }
  onSubmit() {
    if(this.myForm.valid && this.setID){
      this.project.name = this.myForm.get('name')?.value;
      this.project.description = this.myForm.get('description')?.value;
      this.project.tech = this.myForm.get('tech')?.value;
      //PUT (Update)
      this.projectsService.updateProject(this.project)
        .subscribe( response => {
          if(response){
            this.invalid = false;
            this.errorMsg = '';
            this.router.navigate(['/admin']);
          } else{
            this.invalid = true;
            this.errorMsg = 'Something went wrong! Try again.';
            // this.message = [{ severity: 'contrast', detail: 'Something went wrong! Try again.' }];
          }
        });
    }
  }

  closeErrorMsg() {
    this.invalid = false;
    this.errorMsg = '';
  }

  protected readonly invalidField = invalidField;
  protected readonly getErrorMsg = getErrorMsg;


}
