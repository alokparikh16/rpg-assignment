import { gql } from '@apollo/client/core';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($content: String!) {
    createBlog(content: $content) {
      id
      content
      author {
        id
        username
      }
    }
  }
`;