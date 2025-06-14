import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Create HTTP link (without static headers)
const httpLink = createHttpLink({
  uri: 'http://localhost:3200/graphql',
});

// Add dynamic auth header with setContext
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Compose HTTP link with auth
const authedHttpLink = authLink.concat(httpLink);

// WS link (optional: reconnect after login)
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3200/graphql', // NOTE: ws:// not http://
  connectionParams: () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  }),
}));

// Split for query/mutation (http) vs subscription (ws)
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  authedHttpLink
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({ resultCaching: false }),
});
