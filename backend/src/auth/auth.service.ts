// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existing = await this.usersService.findByUsername(username);
    if (existing) throw new Error('Username already taken');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hashed);
    return {
      accessToken: this.getToken(user),
      user,
    };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return {
      accessToken: this.getToken(user),
      user,
    };
  }

  async getToken(user) {
    return this.jwtService.sign(
      {
        sub: user.id,
        username: user.username,
      },
      {
        expiresIn: '45 days',
      },
    );
  }
}
