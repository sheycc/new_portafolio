import { Routes } from '@angular/router';
import { authGuard } from "./auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'portafolio',
    loadChildren: () => import('./portafolio/portafolio.module').then(m => m.PortafolioModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'portafolio'
  }
];
