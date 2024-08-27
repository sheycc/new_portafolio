import {Injectable} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getDownloadURL, getStorage, ref} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  byDefaultImage: string = `images/work_default.jpg`;

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(file: File, project_uid: string) {
    const filePath = `images/${project_uid}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise<string | null>((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url) => {
              resolve(url);  // Resuelve la promesa cuando la carga termina
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

  async getDefault() {
    const storage = getStorage();
    const starsRef = ref(storage, this.byDefaultImage);
    return await getDownloadURL(starsRef)
  }

  async getImages(uid: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.downloadImages(uid).subscribe(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  }


  downloadImages(project_uid?: string): Observable<string[]> {
    return new Observable<string[]>(observer => {
      if (!project_uid) {
        // Si no se proporciona project_uid, obtenemos la URL de la imagen por defecto
        this.storage.ref(this.byDefaultImage).getDownloadURL().toPromise().then(defaultUrl => {
          observer.next([defaultUrl]);
          observer.complete();
        }).catch(error => {
          observer.error(error);
        });
      } else {
        const path = `images/${project_uid}/`;
        const ref = this.storage.ref(path);

        ref.listAll().toPromise().then(result => {
          const imageUrls: { name: string, url: string }[] = [];
          const downloadUrlPromises = result!.items.map(item =>
            item.getDownloadURL().then(url => {
              // Extract the file name and URL
              const fileName = item.name;
              imageUrls.push({ name: fileName, url: url });
            })
          );
          Promise.all(downloadUrlPromises).then(() => {
            // Sort the URLs by file name
            imageUrls.sort((a, b) => {
              const numA = parseInt(a.name.split('.')[0], 10);
              const numB = parseInt(b.name.split('.')[0], 10);
              return numA - numB;
            });
            // Extract sorted URLs
            const sortedUrls = imageUrls.map(item => item.url);
            observer.next(sortedUrls);
            observer.complete();
          });
        }).catch(error => {
          observer.error(error);
        });
      }
    });
  }
}
