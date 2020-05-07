import { CoursesService } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course/course';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subjectString'
})
export class SubjectString implements PipeTransform {
  transform(course: Course): string {
    return course.subjects.map(subject => subject.name).join(', ');
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  courses: Course[];

  constructor(private readonly coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
      console.log(this.courses);
    }, (error) => {
      console.log(error);
    });
  }

}
