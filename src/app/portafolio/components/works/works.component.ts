import {AfterViewInit, Component, inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {PrimengModule} from "../../../primeng/primeng.module";
import {CardModule} from "primeng/card";
import {forkJoin, from, Observable, Subscription} from "rxjs";

import {Project} from "../../../shared/interfaces/project";
import {ProjectsService} from "../../../shared/services/projects.service";
import {ImagesService} from "../../../shared/services/images.service";
import {map} from "rxjs/operators";

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

  imagesMap: { [key: string]: string[] } = {};
  projects$: Observable<Project[]> | undefined;
  private subscription!: Subscription;

  constructor(private projectsService: ProjectsService, private imagesService: ImagesService) {}


  ngOnInit() {
    // Obtener todos los projects
    this.projects$ = this.projectsService.getAllProjects();
    // Llenar el imagesMap con las imágenes para cada proyecto
    this.projects$.subscribe(projects => {
      projects.forEach(project => {
        this.loadImagesMap(project.uid!).then();
      });
    });

    // this.subscription = this.projects$.subscribe(projects => {
    //   const imageObservables = projects.map(project =>
    //     from(this.imagesService.getImages(project.uid!)).pipe(
    //       map(images => ({ uid: project.uid, images }))
    //     )
    //   );
    //   forkJoin(imageObservables).subscribe(imageResults => {
    //     imageResults.forEach(result => {
    //       this.imagesMap[result.uid!] = result.images;
    //     });
    //   });
    // });
  }

  async loadImagesMap(uid: string): Promise<void> {
    try {
      this.imagesMap[uid] = await this.imagesService.getImages(uid);
      // if(!this.imagesMap[uid].length) {
      //   this.imagesMap[uid] = [await this.imagesService.getDefault()];
      // }
    } catch (error) {
      console.error(`Error loading images for project ${uid}:`, error);
      this.imagesMap[uid] = ['assets/images/work_default.jpg'];
    }
  }

  getImages(uid: string) {
    return this.imagesMap[uid];
  }

}
