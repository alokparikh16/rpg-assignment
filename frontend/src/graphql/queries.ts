// graphql/queries.ts
import gql from 'graphql-tag';

export const BLOGS_QUERY = gql`
  query {
    blogs {
      id
      content
      author {
        username
      }
    }
  }
`;

export const BLOG_CREATED_SUBSCRIPTION = gql`
  subscription {
    blogCreated {
      id
      content
      author {
        id
        username
      }
    }
  }
`;
