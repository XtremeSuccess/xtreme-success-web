import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
