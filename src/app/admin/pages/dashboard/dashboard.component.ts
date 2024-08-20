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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  projects$: Observable<Project[]> | undefined;
  skills$: Observable<Skill[]> | undefined;
  subskills: { [key: string]: Subskill[] } = {};

  constructor(private projectsService: ProjectsService,
              private skillsService: SkillsService,
              private subskillService: SubskillsService) {
  }

  ngOnInit(): void {
    this.projects$ = this.projectsService.getAllProjects();
    this.skills$ = this.skillsService.getAllSkills();
    this.subskills = this.subskillService.getSubskillsDictionary();
  }

  getSubskillsStr(skill_uid: string) {
    return this.subskills[skill_uid]?.map(subskill => subskill.name).join(', ') || ''
  }

  getSubskills(skill_uid: string) {
    return this.subskills[skill_uid];
  }

  toggleMenu(event: Event) {
    const opener = event.target as HTMLElement;

    if (opener.classList.contains('opener')) {
      opener.classList.toggle('active');
      const submenu = opener.nextElementSibling as HTMLElement;

      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
      } else {
        submenu.style.display = 'block';
      }
    }
  }
}
