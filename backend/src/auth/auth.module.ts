import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_SECRET } from 'src/sample.env';

@Module({
  imports: [UsersModule, JwtModule.register({ secret: JWT_SECRET })],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
