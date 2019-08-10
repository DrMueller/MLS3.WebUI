import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FactOverviewEntryDataService } from 'src/app/areas/shared-domain/services';
import { LoadingIndicatorService } from 'src/app/infrastructure/core-services/loading-indication/services';
import { SnackBarService } from 'src/app/infrastructure/core-services/snack-bar/services';
import { Enquiry, QuestionResult } from 'src/app/infrastructure/shared-features/enquiry-dialog/model';
import { EnquiryService } from 'src/app/infrastructure/shared-features/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/infrastructure/shared-features/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';

import { FactOverviewEntry } from '../../../../shared-domain/models/fact-overview-entry.model';
import { FactsNavigationService } from '../../../common/services';
import { FactsOverviewColDefBuilderService } from '../../services';


@Component({
  selector: 'app-facts-overview',
  templateUrl: './facts-overview.component.html',
  styleUrls: ['./facts-overview.component.scss']
})
export class FactsOverviewComponent implements OnInit {

  public columnDefinitions: ColumnDefinitionsContainer;
  @ViewChild('deleteTemplate', { static: true }) public deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: true }) public editTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<FactOverviewEntry>;
  public overviewEntries: FactOverviewEntry[] = [];
  private readonly _nameSpace = 'areas.facts.overview.components.facts-overview.';

  public constructor(
    private colDefBuilder: FactsOverviewColDefBuilderService,
    private dataService: FactOverviewEntryDataService,
    private navigator: FactsNavigationService,
    private enquiryService: EnquiryService,
    private loadingIndicator: LoadingIndicatorService,
    private translator: TranslateService,
    private snackBarService: SnackBarService) { }

  public async deleteAsync(factId: string): Promise<void> {
    const factIdParsed = parseInt(factId, 10);
    await this.dataService.deleteFactAsync(factIdParsed);

    const entry = this.overviewEntries.find(f => f.id === factIdParsed)!;
    this.table.deleteEntries([entry]);
  }

  public async ngOnInit(): Promise<void> {
    this.loadingIndicator.withLoadingIndicator(async () => {
      this.columnDefinitions = await this.colDefBuilder.buildDefinitionsAsync(this.editTemplate, this.deleteTemplate);
      this.overviewEntries = await this.dataService.loadOverviewAsync();
    });
  }

  public createFact(): void {
    this.navigator.navigateToEdit(-1, false);
  }

  public async deleteAllFactsAsync(): Promise<void> {
    const deleteHeading = await this.translator.get(`${this._nameSpace}deleteAllFactsHeading`).toPromise();
    const deleteQuestion = await this.translator.get(`${this._nameSpace}deleteAllFactsQuestion`).toPromise();

    this.enquiryService.ask(new Enquiry(deleteHeading, deleteQuestion))
      .subscribe(async qr => {
        if (qr === QuestionResult.Yes) {
          await this.dataService.deleteAllFactsAsync();
          const clonsedArray = Object.assign([], this.overviewEntries);
          this.table.deleteEntries(clonsedArray);

          const allFactsDeletedInfo = await this.translator
            .get(`${this._nameSpace}allFactsDeleted`)
            .toPromise();
          this.snackBarService.showSnackBar(allFactsDeletedInfo);
        }
      });
  }

  public edit(factId: string): void {
    const f = parseInt(factId, 10);
    this.navigator.navigateToEdit(f, false);
  }
}
