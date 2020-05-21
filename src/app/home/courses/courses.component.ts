import { SubscriptionService } from './../../services/subscription/subscription-service.service';
import { Order } from './../../models/order/order';
import { OrderService } from './../../services/data/order.service';
import { Course } from './../../models/course/course';
import { CoursesService } from './../../services/data/courses.service';
import { Component, OnInit } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  selectedCourse: Course;
  constructor(
    private readonly courseService: CoursesService,
    private readonly orderService: OrderService,
    private readonly subscriptionService: SubscriptionService
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

  createOrder(amount: number, course_id: number) {
    this.orderService.createOrder(amount, course_id).subscribe(
      (order: Order) => {
        this.loadRazorpay(order);
      }
    )
  }

  loadRazorpay(order: Order) {
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
        "handler": (res) => {
          console.log(res);
          this.orderService.verifyOrder(res).subscribe(
            (data: Order) => {
              console.log(data);
              location.reload();
            }, error => console.log(error)
          );
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    };
  }

}
