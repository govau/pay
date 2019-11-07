import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";

import introspectionQueryResultData from "./__generated__/graphql-introspection-result";
import { link } from "../apollo-client";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const cache = new InMemoryCache({
  fragmentMatcher
});

const client = new ApolloClient({
  link,
  cache
});

export default client;
