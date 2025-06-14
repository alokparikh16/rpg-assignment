import { Injectable } from '@nestjs/common';
import { User } from './model/User.model';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  async create(username: string, password: string): Promise<User> {
    const user: User = {
      id: this.idCounter++,
      username,
      password,
    };
    this.users.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }
}
