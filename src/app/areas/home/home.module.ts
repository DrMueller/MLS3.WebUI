import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';

import { HomeComponent } from './entry-point/components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';

@NgModule({
  declarations: [HomeComponent, WelcomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDependenciesModule
  ]
})
export class HomeModule { }