import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

import {Observable} from "rxjs";

import {AboutMeComponent} from "../../../portafolio/components/about-me/about-me.component";
import {ContactComponent} from "../../../portafolio/components/contact/contact.component";
import {FooterComponent} from "../../../shared/footer/footer.component";
import {HeaderComponent} from "../../../shared/header/header.component";
import {SidebarComponent} from "../../../shared/sidebar/sidebar.component";
import {SkillsComponent} from "../../../portafolio/components/skills/skills.component";
import {WorksComponent} from "../../../portafolio/components/works/works.component";
import {ProjectsService} from "../../../shared/services/projects.service";
import {SkillsService} from "../../../shared/services/skills.service";
import {Project} from "../../../shared/interfaces/project";
import {Skill} from "../../../shared/interfaces/skill";
import {Subskill} from "../../../shared/interfaces/subskill";
import {SubskillsService} from "../../../shared/services/subskills.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ResumeComponent} from "../../components/resume/resume.component";
import {PrimengModule} from "../../../primeng/primeng.module";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,

    AboutMeComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SkillsComponent,
    WorksComponent,
    RouterLink,
    RouterOutlet,
    ResumeComponent,
    PrimengModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
