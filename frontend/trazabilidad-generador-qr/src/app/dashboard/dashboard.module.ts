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
import { MatButtonModule } from '@angular/material/button';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { TitlebarService } from './titlebar/titlebar.service';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { BatchDetailComponent } from '../dashboard/sections/batchs/detail/batch-detail/batch-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProfileComponent,
    DashboardContentComponent,
    DashboardSectionsComponent,
    BatchsComponent,
    OriginsComponent,
    LogsComponent,
    UsersComponent,
    TitlebarComponent,
    BatchDetailComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    DashboardRoutesModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatTooltipModule, 
    MatIconModule,
    MatSelectModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    TitlebarService
  ]
})
export class DashboardModule { }
