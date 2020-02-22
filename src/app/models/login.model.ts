import { User } from './user';

export class LoginModel {
  email: string;
  password: string;
}

export class LoginResponse {
  token: string;
  user: User;
}
