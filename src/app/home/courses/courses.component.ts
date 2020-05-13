import { Course } from './../../models/course/course';
import { CoursesService } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  constructor(
    private readonly courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
