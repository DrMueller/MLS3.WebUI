import { Injectable } from '@angular/core';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/infrastructure/shared-features/tables/services';

@Injectable({
  providedIn: 'root'
})
export class FactsSelectionColDefBuilderService {
  public constructor(private builderFactory: ColDefBuilderFactoryService) { }

  public buildDefinitions(): ColumnDefinitionsContainer {
    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
      .withColumn('creationDate', 'Created', 'creation-cell').bindingTo<FactOverviewEntry>('creationDateDescription')
      .withColumn('questionText', 'Question').bindingTo<FactOverviewEntry>('questionText')
      .build();
  }
}