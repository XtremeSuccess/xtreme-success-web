import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent, SubjectString } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';



@NgModule({
  declarations: [SubjectString, HomeComponent, IndexComponent, AboutComponent, CoursesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
