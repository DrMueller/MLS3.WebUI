import { Injectable } from '@angular/core';
import { IAppAreaProviderService } from 'src/app/infrastructure/app-shell/app-areas/interfaces';
import { AppArea } from 'src/app/infrastructure/app-shell/app-areas/models';

@Injectable()
export class FactsAreaProviderService implements IAppAreaProviderService {
  public provideArea(): AppArea {
    return new AppArea('Facts', '/facts', true);
  }
}