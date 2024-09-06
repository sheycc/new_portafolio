import { Component } from '@angular/core';

import { PrimengModule } from "../../../primeng/primeng.module";
import { SkillsGraphicComponent } from "../skills-graphic/skills-graphic.component";
import { TimelinesGraphicComponent } from "../timelines-graphic/timelines-graphic.component";

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
