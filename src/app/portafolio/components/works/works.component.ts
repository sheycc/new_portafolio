import { Component, OnInit } from '@angular/core';

import { PrimengModule } from "../../../primeng/primeng.module";
import { Project } from "../../../shared/interfaces/project";
import { ProjectsService } from "../../../shared/services/projects.service";
import { ImagesService } from "../../../shared/services/images.service";

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    PrimengModule
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent implements OnInit {

  imagesMap: { [key: string]: string[] } = {};
  projects: Project[] | undefined;

  constructor(private projectsService: ProjectsService, private imagesService: ImagesService) {}


  ngOnInit() {
    // Obtener todos los proyectos y las imagenes de cada uno
    this.projectsService.getAllProjects().subscribe(projects => {
      this.projects = projects;
      this.projects.forEach(project => {
        this.loadImagesMap(project.uid!);
      });
    });
  }

  async loadImagesMap(uid: string): Promise<void> {
    try {
      this.imagesMap[uid] = await this.imagesService.getImages(uid);
    } catch (error) {
      console.error(`Error loading images for project ${uid}:`, error);
      this.imagesMap[uid] = ['assets/images/work_default.jpg'];
    }
  }

  getImages(uid: string) {
    return this.imagesMap[uid];
  }

}
