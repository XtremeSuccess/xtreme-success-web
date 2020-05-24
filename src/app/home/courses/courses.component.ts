import { UserService } from 'src/app/services/data/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Course } from './../../models/course/course';
import { CoursesService } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/auth';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  isLoggedIn: boolean;
  user: User;
  localUser: any;
  courses: Course[];
  selectedCourse: Course;
  isAlreadySubscribed: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly courseService: CoursesService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.localUser = this.authService.getUser()
  }

  ngOnInit(): void {
    if (this.localUser) {
      this.userService.getUser(this.localUser.id).subscribe(
        (u: User) => {
          this.user = u;
          if (u.user_detail.subscription) {
            this.isAlreadySubscribed = true;
          }
          this.courseService.getAllCourses().subscribe(
            (data: Course[]) => {
              this.courses = data;
            },
            (error) => {
              console.log(error);
            }
          );
        }
      );
    } else {
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

  openCheckoutPage(course_id: number) {
    this.router.navigate(['/home/checkout'], { queryParams: { id: course_id } });
  }

}
