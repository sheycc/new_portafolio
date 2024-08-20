import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortafolioRoutingModule } from './portafolio-routing.module';
import { MessageService } from "primeng/api";
import { PrimengModule } from "../primeng/primeng.module";


@NgModule({
  declarations: [],
  providers: [MessageService],
  imports: [
    CommonModule,

    PortafolioRoutingModule,
    PrimengModule
  ]
})
export class PortafolioModule { }
