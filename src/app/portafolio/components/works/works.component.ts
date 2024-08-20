import {Component, OnInit} from '@angular/core';
import {PrimengModule} from "../../../primeng/primeng.module";
import {CardModule} from "primeng/card";
import {Observable} from "rxjs";

import { Project } from "../../../shared/interfaces/project";
import { ProjectsService } from "../../../shared/services/projects.service";

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    PrimengModule,
    CardModule
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent implements OnInit {

  private imagesMap: { [key: string]: string[] } = {};

  projects$: Observable<Project[]> | undefined;

  constructor(private projectsService: ProjectsService) {}


  ngOnInit() {
    // Obtener todos los projects
    this.projects$ = this.projectsService.getAllProjects();
    this.imagesMap = {
      '1': ["assets/images/1/1.png", "assets/images/1/2.png", "assets/images/1/3.png", "assets/images/1/4.png", "assets/images/1/5.png", "assets/images/1/6.png"],
      '2': ["assets/images/2/1.png"],
      '3': ["assets/images/3/1.jpg", "assets/images/3/2.jpg", "assets/images/3/3.jpg"],
      '4': ["assets/images/4/1.png"],
      '5': ["assets/images/5/1.jpg", "assets/images/5/2.jpg", "assets/images/5/3.jpg", "assets/images/5/4.jpg", "assets/images/5/5.jpg", "assets/images/5/6.jpg", "assets/images/5/7.jpg", "assets/images/5/8.jpg", "assets/images/5/9.jpg", "assets/images/5/10.jpg", "assets/images/5/11.jpg", "assets/images/5/12.jpg", "assets/images/5/13.jpg", "assets/images/5/14.jpg"],
      '6': ["assets/images/6/1.png", "assets/images/6/2.png", "assets/images/6/3.png", "assets/images/6/4.png", "assets/images/6/5.png", "assets/images/6/6.png", "assets/images/6/7.png", "assets/images/6/8.png"],
      '7': ["assets/images/7/1.png", "assets/images/7/2.png", "assets/images/7/3.png", "assets/images/7/4.png", "assets/images/7/5.png", "assets/images/7/6.png", "assets/images/7/7.png", "assets/images/7/8.png", "assets/images/7/9.png", "assets/images/7/10.png", "assets/images/7/11.png", "assets/images/7/12.png"],
    };
  }

  getImages(uid: string): string[] {
    try {
      // Verifica si el uid existe en el objeto imagesMap
      if (this.imagesMap[uid]) {
        return this.imagesMap[uid];
      } else {
        // Si no se encuentra el uid, lanza una excepción
        throw new Error(`No images found for uid: ${uid}`);
      }
    } catch (error) {
      // Maneja el error y devuelve una lista vacía o una lista de imágenes por defecto
      throw error;
    }
  }
}
