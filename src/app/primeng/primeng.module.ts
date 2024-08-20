import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesModule } from 'primeng/messages';
import { ToastModule } from "primeng/toast";
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MessagesModule,
    ToastModule,
    RatingModule,
    GalleriaModule,
    CardModule
  ],
  exports: [
    MessagesModule,
    ToastModule,
    RatingModule,
    GalleriaModule,
    CardModule
  ]
})
export class PrimengModule { }
