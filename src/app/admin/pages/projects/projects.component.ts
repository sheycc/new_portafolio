import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Observable} from "rxjs";
import {Project} from "../../../shared/interfaces/project";
import {ProjectsService} from "../../../shared/services/projects.service";
import {ResumeComponent} from "../../components/resume/resume.component";
import {PrimengModule} from "../../../primeng/primeng.module";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RouterLink,
    ResumeComponent,
    PrimengModule,
    RouterOutlet
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit{

  projects$: Observable<Project[]> | undefined;

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.projects$ = this.projectsService.getAllProjects();
  }

  deleteProject(uid: string | undefined) {
    if(uid) {
      this.projectsService.deleteProject(uid).subscribe();
    }
  }
}
