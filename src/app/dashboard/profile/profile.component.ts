import { Course } from './../../models/course/course';
import { CoursesService } from './../../services/data/courses.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../../services/auth/auth.service';
import { SubscriptionService } from './../../services/subscription/subscription-service.service';
import { UserService } from './../../services/data/user.service';
import { Subscription } from './../../models/subscription/subscription';
import { User } from './../../models/auth/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  localUser: any;
  user: User;
  subscription: Subscription;
  course: Course;
  
  today: Date = new Date();
  daysLeft: number = 0;

  constructor(
    private readonly userService: UserService,
    private readonly subsService: SubscriptionService,
    private readonly authService: AuthService,
    private readonly courseService: CoursesService,
    private readonly jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.localUser = this.jwtHelper.decodeToken(this.authService.getToken());
    this.userService.getUser(this.localUser.id).subscribe(
      (data: User) => {
        this.user = data;
        this.subsService.getSubscription(this.user.user_detail.subscription).subscribe(
          (subs: Subscription) => {
            console.log(subs);
            this.subscription = subs;
            this.daysLeft = Math.ceil(((new Date(subs.end_date).getTime()) - this.today.getTime()) / (1000 * 60 * 60 * 24));
            this.courseService.getSingleCourse(subs.course.id).subscribe(
              (c: Course) => {
                this.course = c;
              }, error => console.log(error));
          }, error => console.log(error));
      }, error => console.log(error)
    );
  }

}
