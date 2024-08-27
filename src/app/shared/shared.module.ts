import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from "primeng/api";
import { PrimengModule } from "../primeng/primeng.module";

import { ErrorMsgDirective } from "./directives/error-msg.directive";
import {ResumeService} from "./services/resume.service";



@NgModule({
  declarations: [
    ErrorMsgDirective,
  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    ErrorMsgDirective
  ],
})
export class SharedModule { }
