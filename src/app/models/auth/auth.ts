import { Class } from '../class/class';
import { Course } from '../course/course';
export class Role {
    description: string;
    id: number;
    name: string;
    type: string;
}

export class User {
    blocked: boolean;
    class: Class;
    confirmed: boolean;
    course: Course;
    created_at: string;
    email: string;
    id: number;
    provider: string;
    role: Role;
    updated_at: string;
    username: string;
}

export class Auth {
    jwt: string;
    user: User;
}
