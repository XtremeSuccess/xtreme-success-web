import { UserDetail } from './../../models/auth/auth';
import { Subscription } from 'src/app/models/subscription/subscription';
import { Order } from './../../models/order/order';
import { SubscriptionService } from './../../services/subscription/subscription-service.service';
import { Course } from './../../models/course/course';
import { User } from 'src/app/models/auth/auth';
import { OrderService } from './../../services/data/order.service';
import { CoursesService } from './../../services/data/courses.service';
import { UserService } from 'src/app/services/data/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  courseIdParam: number;
  course: Course;
  localUser: any;
  user: User;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly courseService: CoursesService,
    private readonly orderService: OrderService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    this.localUser = this.authService.getUser();
  }

  ngOnInit(): void {
    this.userService.getUser(this.localUser.id).subscribe(
      (u: User) => {
        this.user = u;
        this.route.queryParams.subscribe(
          (params: any) => {
            this.courseIdParam = params['id'];
            this.courseService.getSingleCourse(this.courseIdParam).subscribe(
              (course: Course) => {
                this.course = course;
              }, (error) => console.log(error)
            );
          }, (error) => console.log(error)
        );
      }, (error: any) => console.log(error)
    );
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
