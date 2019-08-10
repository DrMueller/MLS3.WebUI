import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from 'primeng/editor';
import { AppAreaProviderToken } from 'src/app/infrastructure/app-shell/app-areas/constants';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';
import { EnquiryDialogModule } from 'src/app/infrastructure/shared-features/enquiry-dialog';
import { RxFormsModule } from 'src/app/infrastructure/shared-features/rx-forms';
import { TablesModule } from 'src/app/infrastructure/shared-features/tables';

import { LearningSessionsAreaProviderService } from './common/services';
import { FactsSelectionComponent } from './edit/components/facts-selection';
import { LearningSessionEditComponent } from './edit/components/learning-session-edit/learning-session-edit.component';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions/learning-sessions.component';
import { LearningSessionsRoutingModule } from './learning-sessions-routing.module';
import { LearningSessionsServicesModule } from './learning-sessions-services.module';
import { ChunkEditDialogComponent } from './overview/components/chunk-edit-dialog/chunk-edit-dialog.component';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';
import { SessionRunComponent } from './runs/components/session-run';

@NgModule({
  declarations: [
    ChunkEditDialogComponent,
    LearningSessionsComponent,
    LearningSessionsOverviewComponent,
    LearningSessionEditComponent,
    FactsSelectionComponent,
    SessionRunComponent
  ],
  entryComponents: [
    ChunkEditDialogComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    EnquiryDialogModule,
    FormsModule,
    LearningSessionsRoutingModule,
    LearningSessionsServicesModule,
    MatDependenciesModule,
    RxFormsModule,
    TablesModule,
    TranslateModule
  ]
})
export class LearningSessionsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: LearningSessionsModule,
      providers: [
        {
          provide: AppAreaProviderToken,
          multi: true,
          useClass: LearningSessionsAreaProviderService
        }
      ]
    };
  }
}
