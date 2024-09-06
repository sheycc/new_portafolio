import { Component, OnInit } from '@angular/core';

import { Skill } from "../../../shared/interfaces/skill";
import { SkillsService } from "../../../shared/services/skills.service";
import { PrimengModule } from "../../../primeng/primeng.module";

@Component({
  selector: 'app-skills-graphic',
  standalone: true,
  imports: [
    PrimengModule
  ],
  templateUrl: './skills-graphic.component.html',
  styleUrl: './skills-graphic.component.scss'
})
export class SkillsGraphicComponent implements OnInit{

  data: any;
  options: any;
  skills: Skill[] | undefined;

  public brightColors: string[] = [
    '#fd346b',
    '#f3f19e',
    '#ec9ed6',
    '#dce4f7',
    '#33FFBD',
    '#FF33FF',
    '#A873E6',
    '#44d5f4',
  ];

  constructor(private skillService: SkillsService) { }

  ngOnInit() {
    this.skillService.getAllSkills().subscribe(response => {
      this.skills = response;
      this.getGraphicData()
    });

    this.options = {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
        }
      },
      scales: {
        r: {
          ticks: {
            display: false
          },
          grid: {
            color: 'transparent'
          }
        }
      }
    };
  }

  getGraphicData() {
    const ratings = this.skills!.map(skill => skill.rating);
    const labels = this.skills!.map(skill => skill.name);
    const backgroundColors = this.brightColors.slice(0, this.skills!.length);

    this.data = {
      datasets: [
        {
          data: ratings,
          backgroundColor: backgroundColors,
          label: 'Skill Rating'
        }
      ],
      labels: labels,
    };
  }

}
