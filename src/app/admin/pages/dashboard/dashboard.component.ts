import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

import { AboutMeComponent } from "../../../portafolio/components/about-me/about-me.component";
import { ContactComponent } from "../../../portafolio/components/contact/contact.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { HeaderComponent } from "../../../shared/header/header.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { SkillsComponent } from "../../../portafolio/components/skills/skills.component";
import { WorksComponent } from "../../../portafolio/components/works/works.component";
import { ResumeComponent } from "../../components/resume/resume.component";
import { PrimengModule } from "../../../primeng/primeng.module";
import { ProjectsComponent } from "../projects/projects.component";
import { SkillsSubskillsComponent } from "../skills-subskills/skills-subskills.component";

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
    PrimengModule,
    ProjectsComponent,
    SkillsSubskillsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  activeIndex: number = 0;
  constructor(private router: Router) {}

  onTabChange(event: any) {
    switch (event.index) {
      case 1:
        this.router.navigate(['admin/tabs/projects/table']);
        break;
      case 2:
        this.router.navigate(['admin/tabs/skills-subskills/table']);
        break;
      default:
        this.router.navigate(['admin/tabs']);
    }
  }
}
