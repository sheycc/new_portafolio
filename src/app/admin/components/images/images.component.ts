import {Component, Input} from '@angular/core';
import {ImagesService} from "../../../shared/services/images.service";
import {NgIf} from "@angular/common";
import {GalleriaModule} from "primeng/galleria";
import {PrimeTemplate} from "primeng/api";
import {response} from "express";
import {Observable} from "rxjs";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    NgIf,
    GalleriaModule,
    PrimeTemplate
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {

  @Input()
  project_uid!: string;

  fileName: string = 'No file chosen';
  images: string[] = [];

  constructor(private imagesService: ImagesService) {}

  uploadFiles(event: any) {
    console.log(event, 'in')
    const files: FileList = event.target.files;
    this.fileName = `${files.length} files selected. Uploading...`;
    console.log(this.fileName, files, 'this.fileName')
    const uploadPromises = Array.from(files).map((file: File) => {
      return this.imagesService.uploadFile(file, this.project_uid);
    });

    console.log(uploadPromises.length, 'promises')
    Promise.all(uploadPromises).then(imagesURLs => {
      this.fileName = `${files.length} files uploaded successfully.`;
      this.images = imagesURLs.filter(url => url !== null) as string[]; // Filtra nulos y almacena URLs válidas
    }).catch(error => {
      console.error('Error uploading files:', error);
      this.fileName = 'Error during file upload';
    });
  }

}
