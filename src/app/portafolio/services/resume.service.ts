import { inject, Injectable, NgZone } from '@angular/core';
import { MessageService } from "primeng/api";
import { MessagesModule } from 'primeng/messages';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private _visible: boolean = false;
  constructor(private zone: NgZone, private messageService: MessageService) {
    inject(NgZone).runOutsideAngular(() => {
      setTimeout(() => {this.zone.run(() => {
        this._visible = true;
      });}, 1000);
    })
  }

  async download()  {
    try {
      const localFilePath = 'assets/SheylaCruzCastro-CV.pdf';
      const response = await fetch(localFilePath);
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create an anchor element
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = 'SheylaCruzCastro-CV.pdf'; // Specify the desired file name
      // Append the anchor to the document body
      document.body.appendChild(anchor);

      // Trigger a click on the anchor to start the download
      anchor.click();
      // Remove the anchor from the document body
      document.body.removeChild(anchor);
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
      this.confirm();
    } catch (error) {
      console.error('Error downloading CV:', error);
    }

  }

  confirm() {
    console.log("msdkcmfdkv")
    this.messageService.add({severity:'success', summary:'Message', detail:'Curriculum downloaded successfully'});
    setTimeout(() => {this.zone.run(() => {
      this.messageService.clear();
    });}, 2000);
  }
}
