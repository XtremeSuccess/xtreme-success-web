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
  selectedCourse: Course;
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

  showCourse(id: number) {
    this.courseService.getSingleCourse(id).subscribe(
      (data: Course) => {
        this.selectedCourse = data;
      }, (error) => console.log(error)
    );
  }
  closeCard() {
    this.selectedCourse = null;
  }

}
