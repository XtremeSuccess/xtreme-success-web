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

  getOrdersWithParams(data: any) {
    return this.http.get(`${url}/orders`, { params: data });
  }

  getSingleOrder(id: number) {
    return this.http.get(`${url}/orders/${id}`);
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
