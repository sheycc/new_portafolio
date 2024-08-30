import {Component, OnInit} from '@angular/core';

import { PrimengModule } from "../../../primeng/primeng.module";
import {Color} from "chart.js";
import {SkillsService} from "../../../shared/services/skills.service";
import {Observable} from "rxjs";
import {Skill} from "../../../shared/interfaces/skill";
import {response} from "express";
import {SkillsGraphicComponent} from "../skills-graphic/skills-graphic.component";
import {TimelinesGraphicComponent} from "../timelines-graphic/timelines-graphic.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    PrimengModule,
    SkillsGraphicComponent,
    TimelinesGraphicComponent
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
