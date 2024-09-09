import { Injectable } from '@angular/core';
import { finalize } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { getDownloadURL, getStorage, ref } from "@angular/fire/storage";

import { getFileName } from "../utils";


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  resumeURL: string = '';
  byDefaultResume: string = `resumes/CV.pdf`;
  fileName: string = 'No file chosen';

  constructor(private storage: AngularFireStorage) {  }

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
              resolve(this.resumeURL);
            },
            (error) => {
              console.error('Error getting download URL:', error);
              reject(error);
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

      const url = await getDownloadURL(starsRef);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = this.fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error descargando el archivo:', error);
    }
  }

}
