import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// optional, this configuration is only necessary if you're working with AWS AppSync
const middlewareLink = setContext(() => ({
  headers: {
    'X-Api-Key': process.env.APPSYNC_API_KEY
  }
}));

const httpLink = new HttpLink({
  uri: process.env.APPSYNC_GRAPHQL_ENDPOINT,
  fetch: fetch,
});

const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
