import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Observable } from "rxjs";

import { Skill } from "../../../shared/interfaces/skill";
import { Subskill } from "../../../shared/interfaces/subskill";
import { SkillsService } from "../../../shared/services/skills.service";
import { SubskillsService } from "../../../shared/services/subskills.service";
import { PrimengModule } from "../../../primeng/primeng.module";

@Component({
  selector: 'app-skills-subskills',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RouterLink,
    PrimengModule,
    RouterOutlet
  ],
  templateUrl: './skills-subskills.component.html',
  styleUrl: './skills-subskills.component.scss'
})
export class SkillsSubskillsComponent implements OnInit{

  skills$: Observable<Skill[]> | undefined;
  subskills: { [key: string]: Subskill[] } = {};

  constructor(private skillsService: SkillsService,
              private subskillService: SubskillsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.subskills = {};
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
