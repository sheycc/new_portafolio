import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesModule } from 'primeng/messages';
import { ToastModule } from "primeng/toast";
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { KnobModule } from 'primeng/knob';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MessagesModule,
    ToastModule,
    RatingModule,
    GalleriaModule,
    CardModule,
    KnobModule,
    TabViewModule,
    ConfirmPopupModule,
    ChartModule
  ],
  exports: [
    MessagesModule,
    ToastModule,
    RatingModule,
    GalleriaModule,
    CardModule,
    KnobModule,
    TabViewModule,
    ConfirmPopupModule,
    ChartModule
  ]
})
export class PrimengModule { }
