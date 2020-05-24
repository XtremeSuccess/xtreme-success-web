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
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.fetchOrders();
  }

  fetchOrders() {
    this.userService.getUser(this.user.id).subscribe(
      (data: User) => {
        if (data.user_detail.subscription) {
          this.hasActiveSubs = true;
        }
        this.orderService.getOrdersWithParams({ user: this.user.id }).subscribe(
          (orders: Order[]) => {
            this.orders = orders;
          }, error => console.log(error)
        );
      }
    );
  }

  goToCheckout(course_id: number, order_id: number) {
    this.router.navigate(['/home/checkout'], { queryParams: { id: course_id, order: order_id } });
  }
}
