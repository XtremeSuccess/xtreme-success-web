import { MarkdownModule } from 'ngx-markdown';
import { MathJaxModule } from 'ngx-mathjax';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { UnitTestComponent } from './unit-test/unit-test.component';
import { MockTestComponent } from './mock-test/mock-test.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [DashboardComponent, LandingComponent, ProfileComponent, UnitTestComponent, MockTestComponent, OrdersComponent],
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
