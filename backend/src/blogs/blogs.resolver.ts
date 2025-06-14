import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Blog } from './model/blog.model';
import { BlogsService } from './blogs.service';
import { GqlAuthGuard } from 'src/auth/guards/gpl-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/model/User.model';
import { PubSub } from 'graphql-subscriptions';

type BlogEvents = {
  blogCreated: { blogCreated: Blog };
};

const pubSub = new PubSub<BlogEvents>();

@Resolver(() => Blog)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Blog)
  createBlog(@Args('content') content: string, @CurrentUser() user: User) {
    const blog = this.blogsService.create(content, user);
    pubSub.publish('blogCreated', { blogCreated: blog });
    return blog;
  }

  @Query(() => [Blog])
  blogs() {
    return this.blogsService.findAll().reverse();
  }

  @Subscription(() => Blog)
  blogCreated() {
    return pubSub.asyncIterableIterator('blogCreated');
  }
}
