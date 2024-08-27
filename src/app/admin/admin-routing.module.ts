import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import {TablesComponent} from "./pages/tables/tables.component";
import {CreateSkillComponent} from "./pages/create-skill/create-skill.component";
import {CreateSubskillComponent} from "./pages/create-subskill/create-subskill.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tables',
        component: TablesComponent
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
        redirectTo: 'tables'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
