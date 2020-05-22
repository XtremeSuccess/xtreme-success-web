import { UserDetail } from './../../models/auth/auth';
import { UserService } from 'src/app/services/data/user.service';
import { Subscription } from './../../models/subscription/subscription';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { SubscriptionService } from './../../services/subscription/subscription-service.service';
import { Order } from './../../models/order/order';
import { OrderService } from './../../services/data/order.service';
import { Course } from './../../models/course/course';
import { CoursesService } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/auth';

declare var Razorpay: any;

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
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService
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

  createOrder(amount: number, course_id: number) {
    this.orderService.createOrder(amount, course_id).subscribe(
      (order: Order) => {
        console.log(order);
        this.loadRazorpay(order);
      }
    )
  }

  loadRazorpay(order: Order) {
    console.log(order);
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/forms/login']);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      var options = {
        "key": 'rzp_test_FFexwWi4LsHnuc',
        "amount": order.amount,
        "currency": order.currency,
        "name": "WebEdutech Private Limited",
        "description": `${order.course.name} subscription`,
        "order_id": order.order_id,
        "handler": (res: any) => {
          this.orderService.verifyOrder(res).subscribe(
            (data: Order) => {
              let date: Date = new Date();
              this.subscriptionService.createSubscription({
                start_date: date.toISOString(),
                end_date: new Date(date.setFullYear(date.getFullYear() + data.course.duration)).toISOString(),
                course: data.course.id,
                order: data.id
              }).subscribe(
                (sub: Subscription) => {
                  this.userService.updateUserDetails(this.user.user_detail.id, { subscription: sub.id }).subscribe(
                    (userDetails: UserDetail) => {
                      //TODO: check if this is working
                      this.router.navigate(['/dashboard']);
                    },
                    (error) => console.log(error)
                  );
                }
              );
            }, error => console.log(error)
          );
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    };
  }

}
