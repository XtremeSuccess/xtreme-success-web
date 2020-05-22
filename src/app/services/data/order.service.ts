import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/server-config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getOrders(user_id: number) {
    return this.http.get(`${url}/orders?user=${user_id}`);
  }

  getOrdersWithParams(data: any) {
    return this.http.get(`${url}/orders`, { params: data });
  }

  createOrder(amount: number, course: number) {
    return this.http.post(`${url}/orders`, {
      amount: amount,
      course: course
    });
  }

  verifyOrder(orderVerifyData: any) {
    return this.http.post(`${url}/orders/verify`, orderVerifyData);
  }
}
