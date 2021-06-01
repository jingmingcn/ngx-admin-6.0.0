import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbStepperModule,
  NbAlertModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetectFileComponent } from './detect-file.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NgxEchartsModule,
    NbStepperModule,
    AngularFileUploaderModule,
    ReactiveFormsModule,
    NbAlertModule,
  ],
  declarations: [
    DetectFileComponent,
  ],
})
export class DetectFileModule { }
