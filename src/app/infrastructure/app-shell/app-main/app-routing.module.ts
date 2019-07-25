import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from '../security/components/log-in/log-in.component';
import { AuthorizationGuard } from '../security/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../../../areas/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'facts',
    loadChildren: () => import('../../../areas/facts/facts.module').then(m => m.FactsModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'learningsessions',
    loadChildren: () => import('../../../areas/learning-sessions/learning-sessions.module').then(m => m.LearningSessionsModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'login',
    component: LogInComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
