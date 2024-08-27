import { inject, Injectable, NgZone } from '@angular/core';
import { MessageService } from "primeng/api";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {getDownloadURL, getStorage, ref} from "@angular/fire/storage";
import {getFileName} from "../utils";


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private _visible: boolean = false;
  resumeURL: string = '';
  byDefaultResume: string = `resumes/CV.pdf`;
  fileName: string = 'No file chosen';

  constructor(private zone: NgZone, private storage: AngularFireStorage) {
    inject(NgZone).runOutsideAngular(() => {
      setTimeout(() => {this.zone.run(() => {
        this._visible = true;
      });}, 1000);
    })
  }

  async uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `resumes/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise<string | null>((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url) => {
              this.resumeURL = url;
              this.fileName = file.name;
              this.byDefaultResume = this.resumeURL;
              resolve(this.resumeURL);  // Resuelve la promesa cuando la carga termina
            },
            (error) => {
              console.error('Error getting download URL:', error);
              reject(error);  // Rechaza la promesa si ocurre un error
            }
          );
        })
      ).subscribe();
    });
  }

  async download() {
    try {
      if(!this.resumeURL) {
        this.resumeURL = this.byDefaultResume;
        this.fileName = getFileName(this.resumeURL);
      }
      const storage = getStorage();
      const starsRef = ref(storage, this.resumeURL);

      // Obtener la URL de descarga desde Firebase Storage
      const url = await getDownloadURL(starsRef);

      // Realiza una solicitud HTTP para obtener el archivo como un Blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Crear una URL de Blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Crear un elemento de anclaje
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = this.fileName;  // Especifica el nombre del archivo deseado
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Limpia la URL de Blob
      window.URL.revokeObjectURL(blobUrl);

      console.log('Archivo descargado exitosamente.');
    } catch (error) {
      console.error('Error descargando el archivo:', error);
    }
  }

  // confirm() {
  //   this.messageService.add({severity:'success', summary:'Message', detail:'Curriculum downloaded successfully'});
  //   setTimeout(() => {this.zone.run(() => {
  //     this.messageService.clear();
  //   });}, 2000);
  // }
}
