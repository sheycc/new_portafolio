import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import { CreateSkillComponent } from "./pages/create-skill/create-skill.component";
import { CreateSubskillComponent } from "./pages/create-subskill/create-subskill.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { SkillsSubskillsComponent } from "./pages/skills-subskills/skills-subskills.component";

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardComponent,
    children: [
      {
        path: 'projects',
        children: [
          {
            path: 'table',
            component: ProjectsComponent,
          },
          {
            path: 'create-project',
            component: CreateProjectComponent
          },
          {
            path: 'create-project/edit/:uid',
            component: CreateProjectComponent
          },
          {
            path: '**',
            redirectTo: 'table'
          }
        ]
      },
      {
        path: 'skills-subskills',
        children: [
          {
            path: 'table',
            component: SkillsSubskillsComponent,
          },
          {
            path: 'create-skill',
            component: CreateSkillComponent
          },
          {
            path: 'create-subskill/edit/:uid',
            component: CreateSubskillComponent
          },
          {
            path: 'create-subskill/:uid',
            component: CreateSubskillComponent
          },
          {
            path: 'create-skill/edit/:uid',
            component: CreateSkillComponent
          },
          {
            path: '**',
            redirectTo: 'skills-subskills'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'tabs'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
