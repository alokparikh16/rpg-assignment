import { Args, Mutation, ObjectType, Resolver, Field } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/model/User.model';

@ObjectType()
class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.register(username, password);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}
