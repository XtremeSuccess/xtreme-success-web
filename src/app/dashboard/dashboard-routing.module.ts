import { MockTestComponent } from './mock-test/mock-test.component';
import { UnitTestComponent } from './unit-test/unit-test.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'main',
    component: DashboardComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'unit',
        component: UnitTestComponent
      },
      {
        path: 'mock',
        component: MockTestComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/main/landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
