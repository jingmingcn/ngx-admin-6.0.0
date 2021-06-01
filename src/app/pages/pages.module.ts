import { NgModule } from '@angular/core';
import { NbMenuModule,NbStepperModule,NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { AuthGuard } from '../auth-guard.service';
import { DetectFileModule } from './detect-file/detect-file.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbStepperModule,
    NbCardModule,
    FormsModule,
    DetectFileModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [AuthGuard]
})
export class PagesModule {
}
