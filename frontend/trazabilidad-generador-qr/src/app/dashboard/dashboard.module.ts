import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardSectionsComponent } from './dashboard-sections/dashboard-sections.component';
import { BatchsComponent } from './sections/batchs/batchs.component';
import { OriginsComponent } from './sections/origins/origins.component';
import { LogsComponent } from './sections/logs/logs.component';
import { UsersComponent } from './sections/users/users.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    ProfileComponent,
    DashboardContentComponent,
    DashboardSectionsComponent,
    BatchsComponent,
    OriginsComponent,
    LogsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    DashboardRoutesModule
  ]
})
export class DashboardModule { }