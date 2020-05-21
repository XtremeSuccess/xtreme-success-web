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

  constructor(
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly jwtHelper: JwtHelperService
  ) {
    this.user = jwtHelper.decodeToken(authService.getToken());
  }

  ngOnInit(): void {
    this.orderService.getOrders(this.user.id).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      }, error => console.log(error)
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
        "name": "Xtreme Success",
        "description": "Test Transaction",
        "order_id": order.order_id,
        "handler": function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    };
  }

  dispayRazorpay() {
    if (!this.selectedOrder) {
      alert("No orders selected");
    }

  }

}
