import { Course } from 'src/app/models/course/course';
import { User } from 'src/app/models/auth/auth';
export class Order {
    id: number;
    order_id: string;
    currency: string;
    receipt: string;
    offer_id: string;
    status: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    attempts: number;
    user: User;
    course: Course;
    created_at: string;
    updated_at: string;
}
