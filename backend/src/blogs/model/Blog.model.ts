import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/model/User.model';

@ObjectType()
export class Blog {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field(() => User)
  author: User;
}
