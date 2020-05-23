import { User } from 'src/app/models/auth/auth';
import { OrderService } from './../../services/data/order.service';
import { CoursesService } from './../../services/data/courses.service';
import { UserService } from 'src/app/services/data/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  localUser: any;
  user: User;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly courseService: CoursesService,
    private readonly orderService: OrderService,
  ) {
    this.localUser = this.authService.getUser();
  }

  ngOnInit(): void {
    this.userService.getUser(this.localUser.id).subscribe(
      (u: User) => {
        this.user = u;
        //TODO: fetch order details from params
      }, (error: any) => console.log(error)
    );
  }

}
