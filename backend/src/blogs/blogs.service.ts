import { Injectable } from '@nestjs/common';
import { Blog } from './model/blog.model';
import { User } from 'src/users/model/User.model';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];
  private idCounter = 1;

  create(content: string, user: User): Blog {
    const blog: Blog = {
      id: this.idCounter++,
      content,
      author: user,
    };
    this.blogs.push(blog);
    return blog;
  }

  findAll(): Blog[] {
    return this.blogs;
  }
}
