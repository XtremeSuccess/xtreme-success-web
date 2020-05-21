import { Order } from './../order/order';
import { Course } from '../course/course';

export class Subscription {
    id: number;
    start_date: string;
    end_date: string;
    course: Course;
    order: Order;
    created_at: string;
    updated_at: string;
}
