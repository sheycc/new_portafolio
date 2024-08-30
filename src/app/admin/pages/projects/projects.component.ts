import {Component, inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Observable} from "rxjs";
import {Project} from "../../../shared/interfaces/project";
import {ProjectsService} from "../../../shared/services/projects.service";
import {ResumeComponent} from "../../components/resume/resume.component";
import {PrimengModule} from "../../../primeng/primeng.module";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RouterLink,
    ResumeComponent,
    PrimengModule,
    RouterOutlet,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit{

  projects$: Observable<Project[]> | undefined;
  deleted_uid: string = '';

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(private projectsService: ProjectsService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  accept() {
    console.log('accept id', this.deleted_uid)
    this.projectsService.deleteProject(this.deleted_uid).subscribe();
    this.clearMessageService();
  }

  reject() {
    this.clearMessageService();  }

  private loadData(): void {
    this.projects$ = this.projectsService.getAllProjects();
  }

  deleteProject(uid: string) {
    if(uid) {
      this.deleted_uid = uid;
      this.messageService.add({severity: 'primary', summary:'Delete Confirmation', detail:'Do you want to delete this project?', sticky: true});
    }
  }

  clearMessageService() {
    this.messageService.clear();
    this.deleted_uid = '';
  }

}
