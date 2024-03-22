import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page.component';
import { BatchsComponent } from './sections/batchs/batchs.component';
import { OriginsComponent } from './sections/origins/origins.component';
import { LogsComponent } from './sections/logs/logs.component';
import { UsersComponent } from './sections/users/users.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '', 
        redirectTo: 'batchs', 
        pathMatch: 'full' 
      },
      {
          path: 'batchs',
          component: BatchsComponent,
      },
      {
          path: 'origins',
          component: OriginsComponent,
      },
      {
          path: 'logs',
          component: LogsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
