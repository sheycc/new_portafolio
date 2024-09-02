import {Component, OnInit, Renderer2} from '@angular/core';
import { PrimengModule } from "../../../primeng/primeng.module";
import { FormsModule } from "@angular/forms";
import {Observable} from "rxjs";
import {Skill} from "../../../shared/interfaces/skill";
import {Subskill} from "../../../shared/interfaces/subskill";
import {SkillsService} from "../../../shared/services/skills.service";
import {SubskillsService} from "../../../shared/services/subskills.service";
import {response} from "express";



@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    PrimengModule,
    FormsModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit{

  skills$: Observable<Skill[]> | undefined;
  subskills: { [key: string]: Subskill[] } = {};

  constructor(
    private skillService: SkillsService,
    private subskillService: SubskillsService
  ) {}

  ngOnInit() {
    // Obtener todos los skills
    this.skills$ = this.skillService.getAllSkills();
    // Obtener todos los subskills
    this.subskillService.getSubskillsDictionary().subscribe(response => {
      this.subskills = response;
    });
  }

  getSubskillsStr(skill_uid: string) {
    return this.subskills[skill_uid]?.map(subskill => subskill.name).join(', ') || ''
  }

}
