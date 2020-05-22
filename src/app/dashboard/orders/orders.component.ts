import { Router } from '@angular/router';
import { Subscription } from './../../models/subscription/subscription';
import { SubscriptionService } from './../../services/subscription/subscription-service.service';
import { User, UserDetail } from './../../models/auth/auth';
import { UserService } from './../../services/data/user.service';
import { Order } from './../../models/order/order';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderService } from './../../services/data/order.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  user: any;
  orders: Order[];
  selectedOrder: Order;
  hasActiveSubs: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.user = jwtHelper.decodeToken(authService.getToken());
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.userService.getUser(this.user.id).subscribe(
      (data: User) => {
        if (data.user_detail.subscription) {
          this.hasActiveSubs = true;
        }
        this.orderService.getOrders(this.user.id).subscribe(
          (orders: Order[]) => {
            this.orders = orders;
          }, error => console.log(error)
        );
      }
    );
  }

  loadRazorpay(order: Order) {
    this.selectedOrder = order;
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
