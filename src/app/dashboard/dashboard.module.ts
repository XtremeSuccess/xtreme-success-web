import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [DashboardComponent, LandingComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
  ],
})
export class DashboardModule {
}
