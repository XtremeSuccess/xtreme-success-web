import { MarkdownModule } from 'ngx-markdown';
import { MathJaxModule } from 'ngx-mathjax';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, LandingComponent, ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    MathJaxModule.forChild(),
    MarkdownModule.forChild()
  ],
})
export class DashboardModule {
}
