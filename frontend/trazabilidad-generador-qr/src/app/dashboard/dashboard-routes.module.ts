import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page.component';
import { BatchsComponent } from './sections/batchs/batchs.component';
import { OriginsComponent } from './sections/origins/origins.component';
import { LogsComponent } from './sections/logs/logs.component';
import { UsersComponent } from './sections/users/users.component';
import { BatchDetailComponent } from './sections/batchs/detail/batch-detail/batch-detail.component';
import { OriginDetailComponent } from './sections/origins/origin-detail/origin-detail.component';

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
          component: BatchsComponent
      },
      {
        path: 'batchs/detail',
        component: BatchDetailComponent
      },
      {
          path: 'origins',
          component: OriginsComponent
      },
      {
        path: 'origins/detail',
        component: OriginDetailComponent
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
