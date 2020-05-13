import { SubscriptionService } from './../../services/subscription/subscription-service.service';
import { AuthService } from './../../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from './../../models/subject/subject';
import { Chapter } from './../../models/chapter/chapter';
import { SubjectsService } from './../../services/data/subjects.service';
import { CoursesService, Data } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/auth';
import { UserService } from 'src/app/services/data/user.service';
import { Course } from 'src/app/models/course/course';
import { Subscription } from 'src/app/models/subscription/subscription';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user: User;
  course: Course;
  selectedSubject: string;
  chapters: Chapter[];

  selectedChapter: string;
  chapter: Chapter;

  loggedInUser: any;

  constructor(
    private readonly userService: UserService,
    private readonly courseService: CoursesService,
    private readonly subjectService: SubjectsService,
    private readonly subscription: SubscriptionService,
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService
  ) {
    this.loggedInUser = jwtHelper.decodeToken(authService.getToken());
  }

  ngOnInit(): void {
    this.userService.getUser(this.loggedInUser.id).subscribe(
      (data: User) => {
        this.user = data
        this.getSubscriptionDetails(data.user_detail.subscription)
      },
      error => console.log(error)
    )
  }

  getSubscriptionDetails(id: number) {
    this.subscription.getSubscription(id).subscribe((data: Subscription) => {
      this.getCourseDetails(data.course.id);
    })
  }

  getCourseDetails(id: number) {
    this.courseService.getSingleCourse(id).subscribe((data: Course) => {
      this.course = data;
    }, (error) => console.log(error));
  }

  getChapters(id: number, name: string) {
    this.selectedSubject = name;
    this.subjectService.getSubjectDetail(id).subscribe((data: Subject) => {
      this.chapters = data.chapters;
    });
  }

  showChapterDetails(chapterName: string, chapterId: number) {
    this.chapter = null;
    this.selectedChapter = chapterName;
    this.subjectService.getSingleChapter(chapterId).subscribe((data: Chapter) => {
      this.chapter = data;
    });
  }

}
