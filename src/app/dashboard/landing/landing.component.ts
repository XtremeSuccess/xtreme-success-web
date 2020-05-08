import { CoursesService } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/auth';
import { UserService } from 'src/app/services/data/user.service';
import { Course } from 'src/app/models/course/course';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user: User;
  course: Course;
  constructor(
    private readonly userService: UserService,
    private readonly courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.userService.getMyself().subscribe(
      (data: User) => {
        console.log(data)
        this.user = data
        this.getCourseDetails(data.course);
      },
      error => console.log(error)
    )
  }


  getCourseDetails(id: number) {
    this.courseService.getSingleCourse(id).subscribe((data: Course) => {
      this.course = data;
      console.log(this.course);
    }, (error) => console.log(error));
  }


}
