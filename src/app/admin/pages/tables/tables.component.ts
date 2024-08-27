import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Project} from "../../../shared/interfaces/project";
import {Skill} from "../../../shared/interfaces/skill";
import {Subskill} from "../../../shared/interfaces/subskill";
import {ProjectsService} from "../../../shared/services/projects.service";
import {SkillsService} from "../../../shared/services/skills.service";
import {SubskillsService} from "../../../shared/services/subskills.service";
import {ResumeComponent} from "../../components/resume/resume.component";
import {PrimengModule} from "../../../primeng/primeng.module";

@Component({
  selector: 'app-tables',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        RouterLink,
        ResumeComponent,
        PrimengModule
    ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit {

  projects$: Observable<Project[]> | undefined;
  skills$: Observable<Skill[]> | undefined;
  subskills: { [key: string]: Subskill[] } = {};

  constructor(private projectsService: ProjectsService,
              private skillsService: SkillsService,
              private subskillService: SubskillsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Limpiar o reinicializar el diccionario de subskills
    this.subskills = {};

    // Obtener los proyectos, habilidades y subhabilidades más recientes
    this.projects$ = this.projectsService.getAllProjects();
    this.skills$ = this.skillsService.getAllSkills();
    this.subskillService.getSubskillsDictionary().subscribe(response => {
      this.subskills = response;
    });
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

  deleteProject(uid: string | undefined) {
    if(uid) {
      this.projectsService.deleteProject(uid).subscribe();
    }
  }
  deleteSkill(uid: string | undefined) {
    if(uid) {
      this.skillsService.deleteSkill(uid).subscribe(
        () => {
          this.loadData();
        }
      );
    }
  }
  deleteSubskill(uid: string | undefined) {
    if(uid) {
      this.subskillService.deleteSubskill(uid).subscribe(
        () => {
          this.loadData();
        }
      );
    }
  }
}
